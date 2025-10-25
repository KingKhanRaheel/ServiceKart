import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { SellerProfile } from "@shared/schema";
import {
  Eye,
  MessageCircle,
  Star,
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SellerDashboard() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: profile, isLoading: profileLoading } = useQuery<SellerProfile>({
    queryKey: ["/api/seller-profile/me"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="p-8 max-w-md text-center border-card-border" data-testid="card-no-profile">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-poppins font-semibold text-2xl mb-2 text-foreground">No Seller Profile</h2>
          <p className="text-muted-foreground mb-6">
            You haven't created a seller profile yet. Create one to start offering your services.
          </p>
          <Button 
            onClick={() => navigate("/register-seller")}
            className="hover-elevate active-elevate-2"
            data-testid="button-create-profile"
          >
            Create Seller Profile
          </Button>
        </Card>
      </div>
    );
  }

  const rating = profile.rating ? profile.rating / 10 : 0;

  const getStatusBadge = () => {
    switch (profile.isVerified) {
      case "verified":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 gap-1" data-testid="badge-verified">
            <CheckCircle className="w-3 h-3" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 gap-1" data-testid="badge-pending">
            <Clock className="w-3 h-3" />
            Pending Verification
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20 gap-1" data-testid="badge-rejected">
            <XCircle className="w-3 h-3" />
            Rejected
          </Badge>
        );
    }
  };

  const profileCompletion = 100; // All fields are required in registration

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="font-poppins font-semibold text-3xl text-foreground mb-2" data-testid="heading-welcome">
            Welcome back, {profile.businessName}!
          </h2>
          <p className="text-muted-foreground">Manage your service provider profile</p>
        </div>

        {/* Status Alert */}
        {profile.isVerified === "pending" && (
          <Card className="p-6 mb-8 bg-yellow-500/5 border-yellow-500/20" data-testid="alert-pending">
            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Verification Pending</h3>
                <p className="text-sm text-muted-foreground">
                  Your profile is under review. You'll be notified once verification is complete. 
                  This usually takes 24-48 hours.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-card-border" data-testid="card-stat-views">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-card-border" data-testid="card-stat-enquiries">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enquiries</p>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Total contacts</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-card-border" data-testid="card-stat-rating">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold text-foreground">
                  {rating > 0 ? rating.toFixed(1) : "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {profile.reviewCount || 0} {profile.reviewCount === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Preview */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-card-border" data-testid="card-profile">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-poppins font-semibold text-xl text-foreground mb-2">Your Profile</h3>
                  <p className="text-sm text-muted-foreground">This is how buyers see your profile</p>
                </div>
                {getStatusBadge()}
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 pb-6 border-b">
                  <Avatar className="w-20 h-20 border-2 border-primary/20">
                    <AvatarImage src={user?.profileImageUrl || undefined} alt={profile.businessName} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {profile.businessName.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-xl text-foreground" data-testid="text-business-name">
                      {profile.businessName}
                    </h4>
                    <p className="text-muted-foreground">{profile.serviceCategory}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-foreground mb-2">Description</h5>
                  <p className="text-muted-foreground" data-testid="text-description">{profile.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-foreground mb-1">Contact</h5>
                    <p className="text-muted-foreground" data-testid="text-contact">{profile.contactNumber}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-1">Experience</h5>
                    <p className="text-muted-foreground" data-testid="text-experience">
                      {profile.experienceYears} {profile.experienceYears === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                  {profile.serviceArea && (
                    <div>
                      <h5 className="font-medium text-foreground mb-1">Service Area</h5>
                      <p className="text-muted-foreground" data-testid="text-service-area">{profile.serviceArea}</p>
                    </div>
                  )}
                  {profile.priceRange && (
                    <div>
                      <h5 className="font-medium text-foreground mb-1">Price Range</h5>
                      <p className="text-muted-foreground" data-testid="text-price-range">{profile.priceRange}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h5 className="font-medium text-foreground mb-1">Address</h5>
                  <p className="text-muted-foreground" data-testid="text-address">{profile.address}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="p-6 border-card-border" data-testid="card-completion">
              <h4 className="font-semibold text-foreground mb-4">Profile Completion</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Overall</span>
                    <span className="font-medium text-foreground">{profileCompletion}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${profileCompletion}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your profile is complete! Great job.
                </p>
              </div>
            </Card>

            <Card className="p-6 border-card-border" data-testid="card-quick-actions">
              <h4 className="font-semibold text-foreground mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start gap-2 hover-elevate active-elevate-2"
                  variant="outline"
                  disabled
                  data-testid="button-edit-profile"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
                <Button 
                  className="w-full justify-start gap-2 hover-elevate active-elevate-2"
                  variant="outline"
                  disabled
                  data-testid="button-add-photos"
                >
                  <Eye className="w-4 h-4" />
                  Add Photos
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                More features coming soon!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
