'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Eye, EyeOff, Loader2, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const { setUser, setCurrentPage } = useAppStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Por favor ingrese usuario y contraseña');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Error al iniciar sesión');
        return;
      }
      setUser(data.user, data.token);
      toast.success(`Bienvenido, ${data.user.name}`);
      setCurrentPage(data.user.role === 'admin' ? 'admin' : 'dashboard');
    } catch {
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setUsername('demo');
    setPassword('demo');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1628] bg-grid-pattern p-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A94E]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A94E]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A94E]/10 border border-[#C9A94E]/20 mb-4">
            <Scale className="w-8 h-8 text-[#C9A94E]" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">LexDoc</h1>
          <p className="text-[#94A3B8] mt-2">Generación inteligente de documentos legales colombianos</p>
        </div>

        <Card className="bg-[#0F1F38]/80 backdrop-blur-xl border-white/5 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-xl">Iniciar Sesión</CardTitle>
            <CardDescription className="text-[#94A3B8]">Acceda a su cuenta para generar documentos legales</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#CBD5E1]">Usuario</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingrese su usuario"
                  className="bg-white/5 border-white/10 text-white placeholder:text-[#64748B] focus:border-[#C9A94E] focus:ring-[#C9A94E]/20"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#CBD5E1]">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    className="bg-white/5 border-white/10 text-white placeholder:text-[#64748B] focus:border-[#C9A94E] focus:ring-[#C9A94E]/20 pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#CBD5E1] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9A94E] hover:bg-[#D4BA6A] text-[#0A1628] font-semibold h-11 transition-all hover:shadow-[0_0_20px_rgba(201,169,78,0.3)]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                Iniciar Sesión
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-[#64748B] text-xs mb-3">
                <Shield className="w-3.5 h-3.5" />
                <span>Acceso de demostración</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={fillDemo}
                  className="text-xs text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C9A94E]/30 transition-all"
                >
                  <div className="text-[#C9A94E] font-medium">Cliente Demo</div>
                  <div className="text-[#64748B] mt-0.5">demo / demo</div>
                </button>
                <button
                  onClick={() => { setUsername('1038796568'); setPassword('1038796568'); }}
                  className="text-xs text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C9A94E]/30 transition-all"
                >
                  <div className="text-[#C9A94E] font-medium">Administrador</div>
                  <div className="text-[#64748B] mt-0.5">1038796568 / 1038796568</div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-[#475569] text-xs mt-6">
 Protegido con encriptación de extremo a extremo · Conforme a la Ley 1581 de 2012
        </p>
      </div>
    </div>
  );
}