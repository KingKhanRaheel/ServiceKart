import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { insertSellerProfileSchema, type InsertSellerProfileInput, SERVICE_CATEGORIES } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { CheckCircle, ArrowRight, ArrowLeft, Briefcase, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function SellerRegistration() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const totalSteps = 4;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in first to register as a seller",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  const form = useForm<InsertSellerProfileInput>({
    resolver: zodResolver(insertSellerProfileSchema),
    defaultValues: {
      businessName: "",
      serviceCategory: "",
      description: "",
      contactNumber: "",
      address: "",
      serviceArea: "",
      experienceYears: 0,
      priceRange: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertSellerProfileInput) => {
      return await apiRequest("POST", "/api/seller-profile", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Your seller profile has been submitted for verification",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertSellerProfileInput) => {
    mutation.mutate(data);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof InsertSellerProfileInput)[] = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = ["businessName", "serviceCategory"];
        break;
      case 2:
        fieldsToValidate = ["description", "contactNumber", "address"];
        break;
      case 3:
        fieldsToValidate = ["experienceYears"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20" data-testid="badge-seller-registration">
            <Briefcase className="w-3 h-3 mr-1" />
            Seller Registration
          </Badge>
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-foreground" data-testid="heading-seller-registration">
            Become a Service Provider
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join our network of trusted professionals and grow your business
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8" data-testid="progress-registration">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="p-8 border-card-border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Business Details */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300" data-testid="step-1">
                  <div className="space-y-2">
                    <h2 className="font-poppins font-semibold text-xl text-foreground">Business Information</h2>
                    <p className="text-sm text-muted-foreground">Tell us about your business</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business/Owner Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Sharma Plumbing Services" {...field} data-testid="input-business-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SERVICE_CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category} data-testid={`option-category-${category}`}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Contact & Details */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300" data-testid="step-2">
                  <div className="space-y-2">
                    <h2 className="font-poppins font-semibold text-xl text-foreground">Contact & Service Details</h2>
                    <p className="text-sm text-muted-foreground">Help customers understand what you offer</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your services, expertise, and what makes you unique..."
                            className="min-h-[120px] resize-none"
                            {...field}
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} data-testid="input-contact-number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your complete business address"
                            className="resize-none"
                            {...field}
                            data-testid="textarea-address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Experience */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300" data-testid="step-3">
                  <div className="space-y-2">
                    <h2 className="font-poppins font-semibold text-xl text-foreground">Experience & Coverage</h2>
                    <p className="text-sm text-muted-foreground">Share your professional background</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="experienceYears"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience *</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-experience">
                              <SelectValue placeholder="Select years of experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[...Array(31)].map((_, i) => (
                              <SelectItem key={i} value={i.toString()} data-testid={`option-experience-${i}`}>
                                {i} {i === 1 ? 'year' : 'years'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Area (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Mumbai, Navi Mumbai, Thane"
                            {...field}
                            data-testid="input-service-area"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priceRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Range (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., ₹500-1000/hr"
                            {...field}
                            data-testid="input-price-range"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300" data-testid="step-4">
                  <div className="space-y-2">
                    <h2 className="font-poppins font-semibold text-xl text-foreground">Review & Submit</h2>
                    <p className="text-sm text-muted-foreground">Review your information before submitting</p>
                  </div>

                  <Card className="p-6 bg-muted/30 border-card-border space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Business Name</p>
                      <p className="text-foreground">{form.watch("businessName")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Service Category</p>
                      <p className="text-foreground">{form.watch("serviceCategory")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Description</p>
                      <p className="text-foreground line-clamp-3">{form.watch("description")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Contact</p>
                      <p className="text-foreground">{form.watch("contactNumber")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Experience</p>
                      <p className="text-foreground">{form.watch("experienceYears")} years</p>
                    </div>
                  </Card>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Verification Process</p>
                      <p className="text-sm text-muted-foreground">
                        Your profile will be reviewed by our team. You'll receive a notification once verified.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="gap-2 hover-elevate active-elevate-2"
                    data-testid="button-prev"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                )}
                
                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="gap-2 ml-auto hover-elevate active-elevate-2"
                    data-testid="button-next"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="gap-2 ml-auto hover-elevate active-elevate-2"
                    data-testid="button-submit"
                  >
                    {mutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Submit for Verification
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help? Contact us at support@servicekart.com
        </p>
      </div>
    </div>
  );
}
