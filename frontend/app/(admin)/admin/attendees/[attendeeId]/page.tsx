import { FC } from "react";

import Error401 from "@/components/401";
import AttendeeForm from "./components/AttendeeForm";
import { getAttendee } from "@/actions/getAttendee";

interface AttendeePageProps {
  params: { attendeeId: string };
}

const AttendeePage: FC<AttendeePageProps> = async ({ params }) => {
  const attendeeId = params.attendeeId;

  const attendeeData = await getAttendee(attendeeId);

  if (attendeeData === "not authorized") {
    return <Error401 />;
  }

  const plainAttendeeData = JSON.parse(JSON.stringify(attendeeData));

  return <AttendeeForm initialData={plainAttendeeData} />;
};

export default AttendeePage;
