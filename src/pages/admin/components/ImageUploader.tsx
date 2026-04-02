import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { api } from '@/lib/api';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const { url } = await api.upload(file);
      onChange(url);
    } catch {
      alert('上傳失敗');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-1">圖片</label>
      <div className="flex items-center space-x-4">
        {value && (
          <img src={value} alt="preview" className="w-20 h-20 rounded-xl object-cover border border-rose-gold/10" />
        )}
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center space-x-2 px-4 py-2 border border-dashed border-rose-gold/30 rounded-xl text-sm text-stone-gray/60 hover:border-rose-gold hover:text-rose-gold transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? '上傳中...' : '選擇圖片'}</span>
          </button>
          {value && (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full mt-2 px-3 py-1.5 border border-rose-gold/10 rounded-lg text-xs text-stone-gray/40 outline-none"
              placeholder="或直接輸入圖片 URL"
            />
          )}
        </div>
      </div>
    </div>
  );
}
