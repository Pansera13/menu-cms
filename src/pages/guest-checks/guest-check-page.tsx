import { PageHeader } from "@/components/layout/page-header";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { GuestCheckTable } from "@/cases/guest-checks/components/guest-check-table";
import { useOpenedGuestChecks } from "@/cases/guest-checks/hooks/use-guest-check";

export function GuestCheckPage() {
  const { data: guestChecks = [], isLoading, isError, error, refetch } = useOpenedGuestChecks();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Comandas em aberto"
        description="As comandas são abertas automaticamente no primeiro pedido de cada mesa."
      />

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : guestChecks.length === 0 ? (
        <EmptyState message="Nenhuma comanda em aberto no momento." />
      ) : (
        <GuestCheckTable guestChecks={guestChecks} />
      )}
    </div>
  )
}
