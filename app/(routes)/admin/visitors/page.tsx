import { getAttendees } from "@/actions/getattendee";
import BodyWrapper from "@/components/BodyWrapper";
import EntryForm from "@/components/EntryForm";

type attendeeType = {
  id: string;
  name: string;
};

const AdminVisitorsPage = async () => {
  const attendees: attendeeType[] | null | undefined = await getAttendees();

  return (
    <BodyWrapper>
      <div>
        <EntryForm attendees={attendees} />
      </div>
    </BodyWrapper>
  );
};

export default AdminVisitorsPage;
