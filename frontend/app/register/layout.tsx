import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | IBL 2K26",
  description: "Form pendaftaran Open Recruitment Staff IBL 2K26 — ITS Basketball League.",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link rel="preload" as="image" href="/images/Full_Page_Desktop.png" />
      {children}
    </>
  );
}
