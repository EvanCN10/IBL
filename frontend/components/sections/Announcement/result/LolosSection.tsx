import React from "react";

interface LolosSectionProps {
  nrp: string;
}

export default function LolosSection({ nrp }: LolosSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-emerald-50 border border-emerald-200 rounded-lg text-center max-w-md mx-auto my-12">
      <h2 className="text-2xl font-bold text-emerald-800 mb-2">Selamat! Anda Lolos</h2>
      <p className="text-emerald-600 mb-4">NRP: {nrp}</p>
      <p className="text-emerald-700">
        Selamat bergabung di IBL 2026 Future Crew. Langkah berikutnya akan diumumkan segera.
      </p>
    </div>
  );
}
