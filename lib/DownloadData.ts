import * as XLSX from "xlsx";

import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type downloadDataPropType = {
  data: Visitor[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
};

export default function downloadData({
  data,
  setLoading,
  type,
}: downloadDataPropType) {
  try {
    setLoading(true);
    if (data) {
      // Convert data to Excel file
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Visitors");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${type}.xlsx`;
      link.click();
    }
  } catch (error) {
    console.error("DOWNLOAD_FILE_ERROR");
    console.error(error);
    toast({
      description: "Something went wrong!!",
      variant: "destructive",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  }
  //    finally {
  //     setLoading(false);
  //   }
}
