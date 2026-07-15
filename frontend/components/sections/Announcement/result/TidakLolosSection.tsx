import React from "react";

interface TidakLolosSectionProps {
  nrp: string;
}

export default function TidakLolosSection({ nrp }: TidakLolosSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-rose-50 border border-rose-200 rounded-lg text-center max-w-md mx-auto my-12">
      <h2 className="text-2xl font-bold text-rose-800 mb-2">Mohon Maaf</h2>
      <p className="text-rose-600 mb-4">NRP: {nrp}</p>
      <p className="text-rose-700">
        Anda belum lolos seleksi IBL 2026 Future Crew kali ini. Jangan menyerah dan teruslah berlatih!
      </p>
    </div>
  );
}
