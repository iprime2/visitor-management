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
      <div className="flex flex-col gap-2">
        <Heading
          title="Welcome To MIT-WPU"
          description="Please fill your details."
        />
        <Separator />
      </div>
      <div>
        <EntryForm attendees={attendees} type="public" />
      </div>
      <Separator />
      <div className="flex items-center justify-center text-2xl text-bold">
        Thank you for visiting MIT-WPU!
      </div>
    </BodyWrapper>
  );
};

export default VisitorsPage;
