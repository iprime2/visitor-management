import { getAttendees } from "@/actions/getAttendees";
import BodyWrapper from "@/components/BodyWrapper";
import EntryForm from "@/components/EntryForm";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";

type attendeeType = {
  id: string;
  name: string;
};

const AdminVisitorsPage = async () => {
  const attendees: attendeeType[] | null | undefined = await getAttendees();

  return (
    <BodyWrapper>
      {/* <FeedbackModal /> */}
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
