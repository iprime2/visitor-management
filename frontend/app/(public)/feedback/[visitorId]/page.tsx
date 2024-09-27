"use client";

import React, { FC } from "react";

import FeedbackForm from "@/components/FeedbackForm";
import BodyWrapper from "@/components/BodyWrapper";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";

interface FeedbackPageProps {
  params: { visitorId: string };
}
const FeedbackPage: FC<FeedbackPageProps> = ({ params }) => {
  const visitorOutId = params.visitorId;

  return (
    <BodyWrapper>
      <div className="flex flex-col gap-2">
        <Heading title="Feedback Form" description="Please provide feedback" />
        <Separator />
      </div>
      <FeedbackForm visitorId={visitorOutId} />
      <Separator />
      <div className="flex items-center justify-center text-2xl text-bold">
        Thank you for visiting MIT-WPU!
      </div>
    </BodyWrapper>
  );
};

export default FeedbackPage;
