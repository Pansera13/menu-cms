import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { useGuestCheck } from "@/cases/guest-checks/hooks/use-guest-check";
import { useOrders } from "@/cases/orders/hooks/use-order";
import { OrderCard } from "@/cases/orders/components/order-card";
import { formatCurrency, formatDateTime } from "@/lib/format";

export function GuestCheckDetailPage() {
  const { id = '' } = useParams();

  const guestCheck = useGuestCheck(id);
  const orders = useOrders({ guestCheckId: id });

  const total = (orders.data ?? []).reduce((sum, order) => sum + Number(order.total), 0);

  const backLink = (
    <Link to="/guest-checks" className={buttonVariants({ variant: 'outline' })}>
      <ArrowLeft /> Voltar
    </Link>
  );

  if (guestCheck.isLoading) {
    return <LoadingState rows={3} />;
  }

  if (guestCheck.isError || !guestCheck.data) {
    return (
      <div className="flex flex-col gap-4">
        {backLink}
        <ErrorState error={guestCheck.error} onRetry={guestCheck.refetch} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`Comanda — ${guestCheck.data.spot.name}`}
        description={`Aberta em ${formatDateTime(guestCheck.data.createdAt)} · Total acumulado: ${formatCurrency(total)}`}
        actions={backLink}
      />

      {orders.isLoading ? (
        <LoadingState rows={3} />
      ) : orders.isError ? (
        <ErrorState error={orders.error} onRetry={orders.refetch} />
      ) : orders.data?.length === 0 ? (
        <EmptyState message="Esta comanda ainda não possui pedidos." />
      ) : (
        <div className="flex flex-col gap-4">
          {orders.data?.map((order, index) => (
            <OrderCard key={order.id} order={order} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
