import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { MapPin } from "lucide-react";
import type { GuestCheckSummaryDTO } from "../dtos/guest-check.dto";

type GuestCheckTableProps = {
  guestChecks: GuestCheckSummaryDTO[];
}

export function GuestCheckTable({ guestChecks }: GuestCheckTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mesa</TableHead>
            <TableHead>Aberta em</TableHead>
            <TableHead className="text-center">Pedidos</TableHead>
            <TableHead className="text-right">Total acumulado</TableHead>
            <TableHead className="w-36 text-right">Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guestChecks.map((guestCheck) => (
            <TableRow key={guestCheck.id}>
              <TableCell className="font-medium">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  {guestCheck.spot.name}
                </span>
              </TableCell>
              <TableCell>{formatDateTime(guestCheck.createdAt)}</TableCell>
              <TableCell className="text-center">{guestCheck.orderCount}</TableCell>
              <TableCell className="text-right font-semibold">{formatCurrency(guestCheck.total)}</TableCell>
              <TableCell className="text-right">
                <Link to={`/guest-checks/${guestCheck.id}`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                  Ver pedidos
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
