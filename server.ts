import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let aiClient: GoogleGenAI | null = null;
  const getAi = () => {
    if (!aiClient) {
      if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is required");
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
  };

  // API Route: Generate Image
  app.post('/api/generate-image', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      // Using the recommended image preview model for quick generations
      const ai = getAi();
      const response = await ai.models.generateImages({
        model: 'gemini-3.1-flash-image-preview',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          aspectRatio: "16:9",
          outputMimeType: "image/jpeg",
        }
      });

      const base64Image = response.generatedImages[0].image.imageBytes;
      res.json({ image: `data:image/jpeg;base64,${base64Image}` });
    } catch (error: any) {
      console.error('Image generation error:', error);
      res.status(500).json({ error: 'Fehler bei der Bildgenerierung', details: error.message });
    }
  });

  // API Route: Chat (Co-Teacher)
  app.post('/api/export-slides', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const { slides } = req.body;

      // 1. Create a blank presentation
      const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Comic-Kurs Präsentation (VHS)'
        })
      });
      const presentation = await createRes.json();
      if (!presentation.presentationId) throw new Error('Failed to create presentation');
      
      const presentationId = presentation.presentationId;

      // 2. Prepare batch updates to create slides and insert text
      const requests: any[] = [];
      let slideIndex = 1;

      for (const slide of slides) {
        const slideObjectId = `slide_${slideIndex}`;
        const titleObjectId = `title_${slideIndex}`;
        const bodyObjectId = `body_${slideIndex}`;

        // Add a slide
        requests.push({
          createSlide: {
            objectId: slideObjectId,
            slideLayoutReference: { predefinedLayout: 'TITLE_AND_BODY' },
            placeholderIdMappings: [
              {
                layoutPlaceholder: { type: 'TITLE', index: 0 },
                objectId: titleObjectId,
              },
              {
                layoutPlaceholder: { type: 'BODY', index: 0 },
                objectId: bodyObjectId,
              }
            ]
          }
        });

        // Insert title
        requests.push({
          insertText: {
            objectId: titleObjectId,
            text: slide.title || ' '
          }
        });

        // Insert body
        const contentText = slide.content ? slide.content.join('\n\n') : ' ';
        requests.push({
          insertText: {
            objectId: bodyObjectId,
            text: contentText
          }
        });

        slideIndex++;
      }

      // 3. Execute batch update
      await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requests })
      });

      res.json({ presentationId });
    } catch (error: any) {
      console.error('Export slides error:', error);
      res.status(500).json({ error: 'Fehler beim Exportieren', details: error.message });
    }
  });

  // API Route: Chat (Co-Teacher)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const contents = [
        { role: 'user', parts: [{ text: "Du bist Christiane Pönisch, eine freundliche, warme und ermutigende Kunstlehrerin an der Volkshochschule. Du leitest den Kurs 'Comic zeichnen - Eine Geschichte in Bildern erzählen'. Antworte immer auf Deutsch, ermutige Anfänger und gib konkrete, einfache Tipps zum Zeichnen, Layouten oder Storytelling. Fasse dich kurz und bündig." }]},
        { role: 'model', parts: [{ text: "Verstanden! Ich freue mich darauf, meinen Schülern zu helfen und ihnen die Angst vor dem leeren Blatt zu nehmen." }]},
        ...history,
        { role: 'user', parts: [{ text: message }]}
      ];

      const ai = getAi();
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: contents,
        config: {
          thinkingConfig: {
            thinkingBudget: 2048,
          } as any,
          tools: [{ googleSearch: {} }],
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Fehler im Chat', details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
