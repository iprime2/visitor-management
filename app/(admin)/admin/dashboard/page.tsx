import { getVisitorsStats } from "@/actions/getVisitorsStats";
import BodyWrapper from "@/components/BodyWrapper";
import Card from "@/components/Card";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  const stats = await getVisitorsStats();

  return (
    <BodyWrapper>
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xl font-semibold">
          Welcome to Visitor Management System!
        </h1>
        <Separator />
      </div>
      <div className="w-full gap-4 flex">
        {stats &&
          stats?.map((stat) => (
            <Card
              key={stat.label}
              title={stat.label}
              description={stat.value}
            />
          ))}
      </div>
    </BodyWrapper>
  );
}
