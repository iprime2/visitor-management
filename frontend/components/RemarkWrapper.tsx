import React, { FC, useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { PencilIcon } from "lucide-react";

import RemarkInput from "./RemarkInput";
import axiosInstance from "@/lib/axioswrapper";

type RemarkWrapperProps = {
  visitorId: string;
};

const RemarkWrapper: FC<RemarkWrapperProps> = ({ visitorId }) => {
  const [initialData, setInitialData] = useState<{ remark: string } | null>(
    null
  );
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
      const res = await axiosInstance.get(`/visitors/remark/${visitorId}`);
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
      {loading && (
        <ClipLoader
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      {!loading && !edit && (
        <div className="flex item-center justify-evenly w-[90%] h-auto">
          <p className="w-full">
            {(initialData && initialData?.remark) || "No Remark!"}
          </p>
          <PencilIcon
            size={16}
            className="hover:cursor-pointer hover:text-grey-200 transition-all"
            onClick={() => setEdit(true)}
          />
        </div>
      )}

      {!loading && edit && initialData && (
        <RemarkInput
          visitorId={visitorId}
          initialData={initialData}
          setEdit={setEdit}
          fetchData={fetchData}
        />
      )}
    </>
  );
};

export default RemarkWrapper;
