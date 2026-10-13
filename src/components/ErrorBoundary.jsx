import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Visbody Next-Gen ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[300px] p-8 rounded-3xl glass-panel border border-red-500/30 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Grafik veya Bileşen Yükleme Uyarısı</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Tarayıcınızın donanım ivmelendirmesi (WebGL) geçici olarak yanıt vermedi. Sistem güvenli modda çalışmaya devam edebilir.
            </p>
          </div>
          <button
            onClick={this.handleReload}
            className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Modülü Yeniden Başlat</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
