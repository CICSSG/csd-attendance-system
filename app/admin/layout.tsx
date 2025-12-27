import AdminSidebar from "@/components/sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="p-8 bg-[#F9FAFB] grow">
        {children}
      </div>

    </div>
  );
}
