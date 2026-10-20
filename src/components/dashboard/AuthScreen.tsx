import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface AuthScreenProps {
  passwordInput: string;
  passwordHint: string;
  onPasswordInputChange: (value: string) => void;
  onUnlock: () => void;
}

export function AuthScreen({
  passwordInput,
  passwordHint,
  onPasswordInputChange,
  onUnlock,
}: AuthScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-[40px] shadow-xl text-center"
      >
        <Lock size={48} className="mx-auto text-[#FF4D6D] mb-4" />
        <h2 className="text-2xl font-bold mb-2">Locked with Love</h2>
        <p className="text-slate-500 mb-6 text-sm">
          Enter our anniversary date to unlock
          <br />
          (Format: YYYYMMDD)
        </p>
        <input
          type="password"
          inputMode="numeric"
          placeholder="Password"
          value={passwordInput}
          onChange={(event) => onPasswordInputChange(event.target.value)}
          className="w-full h-12 px-6 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-center text-xl tracking-widest"
        />
        {passwordHint && (
          <p className="text-pink-600 text-xs mt-2 font-bold uppercase">
            {passwordHint}
          </p>
        )}
        <button
          onClick={onUnlock}
          className="w-full h-12 bg-[#FF4D6D] text-white font-bold rounded-full mt-6 hover:bg-[#FF758F] shadow-lg"
        >
          Unlock 🗝️
        </button>
      </motion.div>
    </div>
  );
}

