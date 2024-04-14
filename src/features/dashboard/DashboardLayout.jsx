import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookings, isLoadingRecentBookings } = useRecentBookings();
  const { recentStays, isLoadingRecentStays, days } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingRecentBookings || isLoadingRecentStays || isLoadingCabins)
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={recentStays}
        numOfDays={days}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={recentStays} />
      <SalesChart bookings={recentBookings} numDays={days} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
