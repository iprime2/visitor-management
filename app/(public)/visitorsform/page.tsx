import { getAttendees } from "@/actions/getAttendees";
import BodyWrapper from "@/components/BodyWrapper";
import EntryForm from "@/components/EntryForm";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";

type attendeeType = {
  id: string;
  name: string;
  createdAt: Date;
};

const VisitorsPage = async () => {
  const attendees: attendeeType[] | string | null | undefined =
    await getAttendees();

  return (
    <BodyWrapper>
      <div>
        <EntryForm attendees={attendees} type="public" />
      </div>
    </BodyWrapper>
  );
};

export default VisitorsPage;
