import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActiveBadge } from "@/components/form/active-badge";
import { RowActions } from "@/components/form/row-actions";
import { MapPin } from "lucide-react";
import type { SpotDTO } from "../dtos/spot.dto";

type SpotTableProps = {
  spots: SpotDTO[];
  onEdit: (spot: SpotDTO) => void;
  onDelete: (spot: SpotDTO) => void;
}

export function SpotTable({ spots, onEdit, onDelete }: SpotTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mesa</TableHead>
            <TableHead className="w-28">Situação</TableHead>
            <TableHead className="w-24 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spots.map((spot) => (
            <TableRow key={spot.id}>
              <TableCell className="font-medium">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  {spot.name}
                </span>
              </TableCell>
              <TableCell><ActiveBadge active={spot.active} /></TableCell>
              <TableCell>
                <RowActions onEdit={() => onEdit(spot)} onDelete={() => onDelete(spot)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
