import { useState } from "react";
import { User, Bell, Shield, Palette, Globe, CreditCard, Building2, Mail, Phone, MapPin, Camera, Save, Moon, Sun, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

interface SettingSection {
  id: string;
  label: string;
  icon: React.ElementType;
}

const sections: SettingSection[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "company", label: "Company", icon: Building2 },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newLeads: true,
    propertyUpdates: true,
    weeklyReport: true,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account preferences</p>
        </div>
        <Button
          onClick={handleSave}
          className={cn(
            "gap-2 transition-all",
            saved ? "bg-success hover:bg-success" : "bg-gradient-primary hover:opacity-90"
          )}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-card p-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    activeSection === section.id
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6">
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Profile Settings</h3>
                <p className="text-sm text-muted-foreground">Update your personal information</p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img 
                    src="https://i.pravatar.cc/150?img=68" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Admin • Beverly Hills Office</p>
                  <button className="text-sm text-primary hover:underline mt-1">Change avatar</button>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" /> Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john.doe@realvista.com"
                    className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" /> Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 234 567 8900"
                    className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" /> Address
                  </label>
                  <input
                    type="text"
                    defaultValue="123 Beverly Hills, Los Angeles, CA 90210"
                    className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="Experienced real estate professional with 10+ years in luxury properties."
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Choose how you want to be notified</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-4">Channels</h4>
                  <div className="space-y-3">
                    {[
                      { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                      { key: "push", label: "Push Notifications", desc: "Browser and mobile push alerts" },
                      { key: "sms", label: "SMS Notifications", desc: "Text message alerts" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                          className={cn(
                            "w-12 h-6 rounded-full transition-colors relative",
                            notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                            notifications[item.key as keyof typeof notifications] ? "translate-x-7" : "translate-x-1"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-4">Event Types</h4>
                  <div className="space-y-3">
                    {[
                      { key: "newLeads", label: "New Leads", desc: "When you receive a new inquiry" },
                      { key: "propertyUpdates", label: "Property Updates", desc: "Price changes and status updates" },
                      { key: "weeklyReport", label: "Weekly Report", desc: "Performance summary every Monday" },
                      { key: "marketing", label: "Marketing Updates", desc: "News and promotional content" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                          className={cn(
                            "w-12 h-6 rounded-full transition-colors relative",
                            notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                            notifications[item.key as keyof typeof notifications] ? "translate-x-7" : "translate-x-1"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Security Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your account security</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-foreground">Password</p>
                      <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Shield className="w-4 h-4" /> Enable
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">2 devices currently logged in</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Appearance</h3>
                <p className="text-sm text-muted-foreground">Customize the look and feel</p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Theme</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3",
                      theme === "light"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Sun className={cn("w-8 h-8", theme === "light" ? "text-primary" : "text-muted-foreground")} />
                    <span className={cn("text-sm font-medium", theme === "light" ? "text-primary" : "text-foreground")}>
                      Light Mode
                    </span>
                    <p className="text-xs text-muted-foreground text-center">
                      Clean and bright interface
                    </p>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3",
                      theme === "dark"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Moon className={cn("w-8 h-8", theme === "dark" ? "text-primary" : "text-muted-foreground")} />
                    <span className={cn("text-sm font-medium", theme === "dark" ? "text-primary" : "text-foreground")}>
                      Dark Mode
                    </span>
                    <p className="text-xs text-muted-foreground text-center">
                      Easy on the eyes
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "company" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Company Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your company information</p>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <img 
                  src="https://i.pravatar.cc/150?img=60" 
                  alt="Company Logo" 
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">RealVista Properties</h4>
                  <p className="text-sm text-muted-foreground">Premium Real Estate Agency</p>
                  <button className="text-sm text-primary hover:underline mt-1">Change logo</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Company Name</label>
                  <input
                    type="text"
                    defaultValue="RealVista Properties"
                    className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Website</label>
                  <input
                    type="url"
                    defaultValue="https://realvista.com"
                    className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Industry</label>
                  <select className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Real Estate</option>
                    <option>Property Management</option>
                    <option>Construction</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === "billing" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Billing & Plans</h3>
                <p className="text-sm text-muted-foreground">Manage your subscription</p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                    <p className="text-2xl font-bold text-foreground">Enterprise</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-success/20 text-success border border-success/30">
                    Active
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">$299/month • Billed annually • Next billing: Feb 15, 2024</p>
                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">View Invoices</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
