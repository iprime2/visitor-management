import { getAttendees } from "@/actions/getAttendees";
import Error401 from "@/components/401";
import BodyWrapper from "@/components/BodyWrapper";
import EntryForm from "@/components/EntryForm";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";

type attendeeType = {
  id: string;
  name: string;
  createdAt: Date;
};

const AdminVisitorsPage = async () => {
  const attendees: attendeeType[] | string | null | undefined =
    await getAttendees();

  if (attendees === "not authorized") {
    return <Error401 />;
  }

  return (
    <BodyWrapper>
      <div className="w-full flex flex-col">
        <Heading title="Visitors Form" description="Entry visitors details" />
      </div>
      <Separator />
      <div>
        <EntryForm attendees={attendees} />
      </div>
    </BodyWrapper>
  );
};

export default AdminVisitorsPage;
