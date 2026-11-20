import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api-error";
import { CircleAlert } from "lucide-react";

type ErrorStateProps = {
  error: unknown;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertTitle>Erro ao carregar os dados</AlertTitle>
      <AlertDescription className="flex flex-col items-start gap-3">
        <span>{getApiErrorMessage(error)}</span>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Tentar novamente
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
