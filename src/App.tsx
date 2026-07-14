/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { SlideViewer } from './components/SlideViewer';
import { AICoTeacher } from './components/AICoTeacher';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      <SlideViewer />
      <AICoTeacher />
    </div>
  );
}
