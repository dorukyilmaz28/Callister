"use client";

import { useState, useEffect } from "react";
import { useLanguage } from '@/contexts/LanguageContext';

interface FRCResponse {
  [key: string]: string;
}

export default function AdminPage() {
  const [data, setData] = useState<FRCResponse>({});
  const [keyInput, setKeyInput] = useState("");
  const [valInput, setValInput] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    loadFRCResponses();
  }, []);

  const loadFRCResponses = async () => {
    try {
      const response = await fetch('/data/frc_responses_full.json');
      const jsonData = await response.json();
      setData(jsonData.frc_responses.responses);
    } catch (error) {
      setMessage(t('admin.messages.loadError') as string);
      console.error(error);
    }
  };

  const addOrUpdate = () => {
    const key = keyInput.trim().toLowerCase();
    if (!key) {
      setMessage(t('admin.messages.keyEmpty') as string);
      return;
    }
    if (/\s{2,}/.test(key)) {
      setMessage(t('admin.messages.keySpaces') as string);
      return;
    }
    if (key.length < 3) {
      setMessage(t('admin.messages.keyShort') as string);
      return;
    }

    setData(prev => ({ ...prev, [key]: valInput }));
    setKeyInput("");
    setValInput("");
    setMessage(`"${key}" ${t('admin.messages.success') as string}`);
  };

  const removeKey = (key: string) => {
    if (key === "bilinmeyen") {
      setMessage(t('admin.messages.keyProtected') as string);
      return;
    }
    const copy = { ...data };
    delete copy[key];
    setData(copy);
    setMessage(`"${key}" ${t('admin.messages.deleted') as string}`);
  };

  const downloadJSON = () => {
    const payload = {
      frc_responses: {
        metadata: {
          version: "1.0",
          last_updated: new Date().toISOString().split('T')[0],
          team: "Callister #9024",
          note: "AI removed — using static FRC FAQ JSON"
        },
        responses: data
      }
    };
    
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frc_responses_full.json";
    a.click();
    URL.revokeObjectURL(url);
    setMessage("JSON dosyası indirildi.");
  };

  const resetToDefault = () => {
    if (confirm("Tüm değişiklikler kaybolacak. Emin misiniz?")) {
      loadFRCResponses();
      setMessage(t('admin.messages.resetSuccess') as string);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-['Poppins'] mb-4">
            {t('admin.title') as string}
          </h1>
          <p className="text-lg text-gray-300">
            {t('admin.subtitle') as string}
          </p>
          <div className="mt-4 p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200 text-sm">
              {t('admin.warning') as string}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-2">Toplam Yanıt</h3>
            <p className="text-3xl font-bold text-purple-400">{Object.keys(data).length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-2">Son Güncelleme</h3>
            <p className="text-3xl font-bold text-green-400">
              {new Date().toLocaleDateString('tr-TR')}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-2">Durum</h3>
            <p className="text-3xl font-bold text-blue-400">Aktif</p>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Yanıt Ekle/Düzenle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('admin.keyLabel') as string}</label>
              <input
                type="text"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="örn: motor kontrolü"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('admin.valueLabel') as string}</label>
              <textarea
                value={valInput}
                onChange={(e) => setValInput(e.target.value)}
                placeholder={t('admin.placeholder') as string}
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addOrUpdate}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
            >
              {t('admin.addUpdate') as string}
            </button>
            <button
              onClick={downloadJSON}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
            >
              {t('admin.download') as string}
            </button>
            <button
              onClick={resetToDefault}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
            >
              {t('admin.reset') as string}
            </button>
          </div>
          {message && (
            <div className="mt-4 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200">{message}</p>
            </div>
          )}
        </div>

        {/* Responses List */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">{t('admin.currentResponses') as string}</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-purple-300">{key}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setKeyInput(key);
                        setValInput(value);
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                    >
                      {t('admin.edit') as string}
                    </button>
                    {key !== "bilinmeyen" && (
                      <button
                        onClick={() => removeKey(key)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                      >
                        {t('admin.delete') as string}
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {value.length > 100 ? `${value.substring(0, 100)}...` : value}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Karakter: {value.length}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-600/20 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">📋 Kullanım Talimatları</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li>• Anahtarlar küçük harfle yazılmalı ve Türkçe karakterler kullanılmalı</li>
            <li>• Yanıtlar detaylı ve açıklayıcı olmalı</li>
            <li>• Değişiklikler otomatik kaydedilmez - JSON indirip manuel güncelleyin</li>
            <li>• 'bilinmeyen' anahtarı silinemez (fallback mesajı)</li>
            <li>• Sezon-özgü bilgiler (ağırlık, ücret) yerine Game Manual'e yönlendirin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
