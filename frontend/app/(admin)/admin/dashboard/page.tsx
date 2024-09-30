import BodyWrapper from "@/components/BodyWrapper";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {

  return (
    <BodyWrapper>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col">
          <Heading
            title="Dashboard"
            description="Welcome to Visitor Management Dashboard."
          />
        </div>
        <Separator />
      </div>
      <div className="w-full gap-4 flex">
        {/* {stats &&
          stats?.map((stat) => (
            <Card
              key={stat.label}
              title={stat.label}
              description={stat.value}
            />
          ))} */}
      </div>
    </BodyWrapper>
  );
}
