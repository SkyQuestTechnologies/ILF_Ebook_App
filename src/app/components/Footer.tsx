export default function Footer() {
  return (
    <footer className="w-full mt-16 py-6 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-500">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Contact</a>
      </div>
      <div className="mt-2">&copy; {new Date().getFullYear()} EbookApp. All rights reserved.</div>
    </footer>
  );
}
