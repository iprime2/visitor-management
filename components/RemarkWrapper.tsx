import React, { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import RemarkInput from "./RemarkInput";
import { ClipLoader } from "react-spinners";
import { PencilIcon } from "lucide-react";

type RemarkWrapperProps = {
  visitorId: string;
  remark: string;
};

const RemarkWrapper: FC<RemarkWrapperProps> = ({ visitorId, remark }) => {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/visitors/remark/${visitorId}`);
      setInitialData(res.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [visitorId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {!edit && (
        <div className="flex item-center justify-between w-[90%] h-auto">
          {remark}
          <PencilIcon
            size={16}
            className="hover:cursor-pointer hover:text-grey-200 transition-all"
            onClick={() => setEdit(true)}
          />
        </div>
      )}

      {edit && initialData && (
        <RemarkInput
          visitorId={visitorId}
          initialData={initialData}
          setEdit={setEdit}
        />
      )}
    </>
  );
};

export default RemarkWrapper;
