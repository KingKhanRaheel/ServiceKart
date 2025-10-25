import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Phone, CheckCircle } from "lucide-react";
import type { SellerProfile, User } from "@shared/schema";

interface ServiceProviderCardProps {
  profile: SellerProfile & { user?: User };
  onContact?: () => void;
}

export function ServiceProviderCard({ profile, onContact }: ServiceProviderCardProps) {
  const rating = profile.rating ? profile.rating / 10 : 0;
  const initials = profile.businessName
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Card className="p-6 hover-elevate transition-all border-card-border group" data-testid={`card-provider-${profile.id}`}>
      <div className="space-y-4">
        {/* Header with Avatar and Verified Badge */}
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <AvatarImage 
              src={profile.user?.profileImageUrl || undefined} 
              alt={profile.businessName}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg text-foreground truncate" data-testid="text-business-name">
                {profile.businessName}
              </h3>
              {profile.isVerified === "verified" && (
                <Badge className="bg-primary/10 text-primary border-primary/20 gap-1 flex-shrink-0" data-testid="badge-verified">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{profile.serviceCategory}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid="text-description">
          {profile.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              {rating > 0 ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium text-foreground ml-1" data-testid="text-rating">
                    {rating.toFixed(1)}
                  </span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">No ratings yet</span>
              )}
            </div>
            {profile.reviewCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {profile.reviewCount} {profile.reviewCount === 1 ? 'review' : 'reviews'}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Experience</p>
            <p className="text-xs text-muted-foreground" data-testid="text-experience">
              {profile.experienceYears} {profile.experienceYears === 1 ? 'year' : 'years'}
            </p>
          </div>
        </div>

        {/* Location & Price */}
        <div className="space-y-2 pt-2 border-t">
          {profile.serviceArea && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{profile.serviceArea}</span>
            </div>
          )}
          {profile.priceRange && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Price Range</span>
              <span className="text-sm font-medium text-foreground" data-testid="text-price">
                {profile.priceRange}
              </span>
            </div>
          )}
        </div>

        {/* Contact Button */}
        <Button
          className="w-full gap-2 hover-elevate active-elevate-2"
          onClick={onContact}
          data-testid="button-contact"
        >
          <Phone className="w-4 h-4" />
          Contact Provider
        </Button>
      </div>
    </Card>
  );
}
