import { EndpointDescriptionCard } from "./endpoint-description-card";
import { EndpointParametersViewer } from "./endpoint-parameters-viewer";
import { EndpointRequestViewer } from "./endpoint-request-viewer";
import { EndpointResponsesViewer } from "./endpoint-responses-viewer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface EndpointPayloadViewerProps {
  endpoint: any;
}

export function EndpointPayloadViewer({ endpoint }: EndpointPayloadViewerProps) {
  const hasContent = 
    endpoint.description || 
    (endpoint.parameters && endpoint.parameters.length > 0) || 
    endpoint.requestBody || 
    endpoint.responses;

  if (!hasContent) {
    return (
      <div className="bg-muted/20 border border-border/40 border-dashed rounded-xl p-12 text-center text-muted-foreground">
        No detailed schema information is available for this endpoint.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <EndpointDescriptionCard description={endpoint.description} />
      
      {(endpoint.parameters || endpoint.requestBody || endpoint.responses) && (
        <Accordion defaultValue={["parameters", "request-body", "responses"]} className="w-full bg-card border border-border/40 rounded-xl shadow-sm">
          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <AccordionItem value="parameters" className="border-border/40 px-6">
              <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4">
                <span className="text-lg font-semibold tracking-tight">Parameters</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <EndpointParametersViewer parameters={endpoint.parameters} />
              </AccordionContent>
            </AccordionItem>
          )}

          {endpoint.requestBody && (
            <AccordionItem value="request-body" className="border-border/40 px-6">
              <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4">
                <span className="text-lg font-semibold tracking-tight">Request Body</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <EndpointRequestViewer requestBody={endpoint.requestBody} />
              </AccordionContent>
            </AccordionItem>
          )}

          {endpoint.responses && (
            <AccordionItem value="responses" className="border-border/40 border-b-0 px-6">
              <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4">
                <span className="text-lg font-semibold tracking-tight">Responses</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <EndpointResponsesViewer responses={endpoint.responses} />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      )}
    </div>
  );
}
