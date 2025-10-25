import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { ServiceProviderCard } from "@/components/service-provider-card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_CATEGORIES, type SellerProfile, type User } from "@shared/schema";

type SellerProfileWithUser = SellerProfile & { user?: User };

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: providers, isLoading } = useQuery<SellerProfileWithUser[]>({
    queryKey: ["/api/seller-profiles"],
  });

  const handleContact = (profile: SellerProfile) => {
    toast({
      title: "Contact Information",
      description: `Call ${profile.contactNumber} to connect with ${profile.businessName}`,
    });
  };

  const filteredProviders = providers?.filter(profile => {
    const matchesSearch = profile.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         profile.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || profile.serviceCategory === selectedCategory;
    const isVerified = profile.isVerified === "verified";
    return matchesSearch && matchesCategory && isVerified;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="font-poppins font-semibold text-3xl text-foreground mb-2" data-testid="heading-welcome">
            Welcome back, {user?.firstName || 'there'}!
          </h2>
          <p className="text-muted-foreground">Find the perfect service provider for your needs</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 border-card-border" data-testid="card-search">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by business name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]" data-testid="select-category-filter">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" data-testid="option-filter-all">All Categories</SelectItem>
                  {SERVICE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category} data-testid={`option-filter-${category}`}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-xl text-foreground" data-testid="heading-results">
              {selectedCategory !== "all" ? selectedCategory : "All Service Providers"}
            </h3>
            <p className="text-sm text-muted-foreground" data-testid="text-count">
              {filteredProviders?.length || 0} providers found
            </p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 border-card-border animate-pulse" data-testid={`skeleton-${i}`}>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-16 bg-muted rounded" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredProviders && filteredProviders.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((profile) => (
                <ServiceProviderCard
                  key={profile.id}
                  profile={profile}
                  onContact={() => handleContact(profile)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-card-border" data-testid="card-no-results">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">No providers found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
