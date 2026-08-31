import React, { useState } from 'react';
import { X, Copy, Check, Download, Code, FileText } from 'lucide-react';
import { generateSingleFileHtml } from '../utils/generateSingleFileHtml';

interface SingleHtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SingleHtmlExportModal: React.FC<SingleHtmlExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const htmlCode = generateSingleFileHtml();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gigas-pastelaria-index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      id="export-html-modal-overlay"
    >
      <div 
        className="bg-slate-900 text-slate-100 rounded-[2.5rem] max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="export-html-modal"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <Code className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-lg text-white font-heading">Código em Arquivo Único HTML</h3>
              <p className="text-xs text-slate-400">HTML + Tailwind CDN + JavaScript embutido pronto para uso</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            id="export-modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950/80">
          <pre className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 overflow-x-auto whitespace-pre-wrap selection:bg-rose-500 selection:text-white">
            {htmlCode}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Você pode copiar e colar este código diretamente em um arquivo <code className="text-amber-400 font-bold">index.html</code>.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-700 transition-all cursor-pointer"
              id="copy-html-btn"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado para a Área de Transferência!' : 'Copiar Código HTML'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-900/40 transition-all cursor-pointer"
              id="download-html-btn"
            >
              <Download className="w-4 h-4" />
              <span>Baixar index.html</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
