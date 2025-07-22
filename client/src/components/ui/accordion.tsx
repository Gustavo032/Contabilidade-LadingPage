import React, { ForwardedRef } from "react";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails, { AccordionDetailsProps } from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { cn } from "@/lib/utils";

const Accordion = MuiAccordion;

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => (
	<MuiAccordion ref={ref} className={cn("border-b", className)} {...props} />
  )
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<HTMLDivElement, AccordionSummaryProps>(
  ({ className, children, ...props }, ref: ForwardedRef<HTMLDivElement>) => (
	<MuiAccordionSummary
	  ref={ref}
	  expandIcon={<ExpandMoreIcon />}
	  className={cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline", className)}
	  {...props}
	>
	  {children}
	</MuiAccordionSummary>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionDetailsProps>(
  ({ className, children, ...props }, ref: ForwardedRef<HTMLDivElement>) => (
	<MuiAccordionDetails
	  ref={ref}
	  className={cn("overflow-hidden text-sm pb-4 pt-0", className)}
	  {...props}
	>
	  {children}
	</MuiAccordionDetails>
  )
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
