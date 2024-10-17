import FeedbackModal from "@/components/modal/FeedbackModal";
import FileUploadModal from "@/components/modal/FileUploadModal";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FeedbackModal />
      <FileUploadModal />
      <div className="flex w-full h-screen">
        <div className="hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0">
          <Sidebar />
        </div>
        <main className="w-full md:pl-60">
          <Navbar type="admin" />
          {children}
        </main>
      </div>
    </>
  );
}
