import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Array<string> }) {
  return (
    <Breadcrumb className="w-full ">
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <>
            <BreadcrumbItem key={index} className="hidden md:block ">
              <BreadcrumbPage>{item}</BreadcrumbPage>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 ? (
              <BreadcrumbSeparator className="hidden md:block" />
            ) : null}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function useBreadcrumbs() {
  return { getBreadcrumbs };
}
