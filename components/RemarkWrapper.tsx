import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import RemarkInput from "./RemarkInput";
import { getRemark } from "@/actions/getRemark";

type RemarkWrapperProps = {
  visitorId: string;
};

const RemarkWrapper: FC<RemarkWrapperProps> = ({ visitorId }) => {
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // setLoading(true);
    try {
      const res = await axios.get(`/api/visitors/remark/${visitorId}`);
      setInitialData(res.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      //   setLoading(false);
    }
  };

  return <RemarkInput visitorId={visitorId} initialData={initialData} />;
};

export default RemarkWrapper;
