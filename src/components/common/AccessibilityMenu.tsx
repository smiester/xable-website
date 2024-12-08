import React, { useState, useEffect } from 'react';
import { Settings, Type, Sun, Moon, Contrast, Eye } from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  contrast: 'normal' | 'high' | 'dark';
  reducedMotion: boolean;
  letterSpacing: number;
  lineHeight: number;
}

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    contrast: 'normal',
    reducedMotion: false,
    letterSpacing: 0,
    lineHeight: 1.5,
  });

  useEffect(() => {
    // Apply settings whenever they change
    document.documentElement.style.fontSize = `${settings.fontSize}%`;
    document.documentElement.style.letterSpacing = `${settings.letterSpacing}px`;
    document.documentElement.style.lineHeight = settings.lineHeight.toString();
    
    // Apply contrast settings
    document.body.classList.remove('high-contrast', 'dark-mode');
    if (settings.contrast === 'high') {
      document.body.classList.add('high-contrast');
    } else if (settings.contrast === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        aria-label="Accessibility options"
        aria-expanded={isOpen}
      >
        <Settings className="h-6 w-6" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-72 bg-white p-4 rounded-lg shadow-xl" role="dialog" aria-label="Accessibility settings">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Accessibility Options
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">
                <Type className="h-4 w-4 inline mr-2" />
                Text Size
              </label>
              <input
                type="range"
                id="fontSize"
                min="80"
                max="150"
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                className="w-full"
                aria-valuemin={80}
                aria-valuemax={150}
                aria-valuenow={settings.fontSize}
              />
              <div className="text-sm text-gray-500 mt-1">{settings.fontSize}%</div>
            </div>

            <div>
              <label htmlFor="contrast" className="block text-sm font-medium text-gray-700 mb-1">
                <Contrast className="h-4 w-4 inline mr-2" />
                Contrast Mode
              </label>
              <select
                id="contrast"
                value={settings.contrast}
                onChange={(e) => updateSetting('contrast', e.target.value as AccessibilitySettings['contrast'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="normal">Normal Contrast</option>
                <option value="high">High Contrast</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>

            <div>
              <label htmlFor="letterSpacing" className="block text-sm font-medium text-gray-700 mb-1">
                Letter Spacing
              </label>
              <input
                type="range"
                id="letterSpacing"
                min="0"
                max="5"
                step="0.5"
                value={settings.letterSpacing}
                onChange={(e) => updateSetting('letterSpacing', Number(e.target.value))}
                className="w-full"
                aria-valuemin={0}
                aria-valuemax={5}
                aria-valuenow={settings.letterSpacing}
              />
              <div className="text-sm text-gray-500 mt-1">{settings.letterSpacing}px</div>
            </div>

            <div>
              <label htmlFor="lineHeight" className="block text-sm font-medium text-gray-700 mb-1">
                Line Height
              </label>
              <input
                type="range"
                id="lineHeight"
                min="1"
                max="2"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => updateSetting('lineHeight', Number(e.target.value))}
                className="w-full"
                aria-valuemin={1}
                aria-valuemax={2}
                aria-valuenow={settings.lineHeight}
              />
              <div className="text-sm text-gray-500 mt-1">{settings.lineHeight}</div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="reducedMotion" className="text-sm font-medium text-gray-700">
                Reduce Motion
              </label>
              <button
                role="switch"
                aria-checked={settings.reducedMotion}
                onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                className={`${
                  settings.reducedMotion ? 'bg-purple-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    settings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}