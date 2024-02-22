import * as XLSX from "xlsx";

import { toast } from "@/components/ui/use-toast";

export default function downloadData(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  type: string,
  data: any | undefined | null = null
) {
  try {
    setLoading(true);
    if (data) {
      // Convert data to Excel file
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, `${type}`);
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelData = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(excelData);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${type}.xlsx`;
      link.click();
      toast({
        description: "File Downloaded",
        variant: "success",
      });
    }
  } catch (error) {
    console.error("DOWNLOAD_FILE_ERROR");
    console.error(error);
    toast({
      description: "Something went wrong!!",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
}
