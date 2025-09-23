import { Card } from '@/components/ui/card';

export const AdCard = () => {
  return (
    <Card className="h-full min-h-[300px] bg-gradient-to-br from-muted/30 to-muted/60 border-dashed border-2 border-muted-foreground/20 flex items-center justify-center">
      <div className="text-center p-6 space-y-4">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Advertisement Space
          </h3>
          <p className="text-sm text-muted-foreground/70">
            Google AdSense Placeholder
          </p>
        </div>
        <div className="text-xs text-muted-foreground/50">
          300x250 • Business Marketplace
        </div>
      </div>
    </Card>
  );
};