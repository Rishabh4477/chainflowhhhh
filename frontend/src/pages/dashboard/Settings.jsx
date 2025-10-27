import React, { useState } from 'react';
import { 
  Save, 
  Bell, 
  Lock, 
  Globe, 
  Mail,
  Shield,
  Database,
  AlertCircle,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      companyName: 'ChainFlow Industries',
      email: 'admin@chainflow.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Street, New York, NY 10001',
      timezone: 'America/New_York',
      language: 'en',
      currency: 'USD'
    },
    notifications: {
      emailNotifications: true,
      orderUpdates: true,
      inventoryAlerts: true,
      supplierUpdates: false,
      weeklyReports: true,
      monthlyReports: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90'
    },
    integrations: {
      emailService: true,
      smsService: false,
      analyticsTracking: true,
      backupEnabled: true
    }
  });

  const handleSave = (section) => {
    toast.success(`${section} settings saved successfully!`);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: Database }
  ];

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={settings.general.companyName}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, companyName: e.target.value }
              })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.general.email}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, email: e.target.value }
              })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={settings.general.phone}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, phone: e.target.value }
              })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={settings.general.timezone}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, timezone: e.target.value }
              })}
              className="input-field"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={settings.general.address}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings.general, address: e.target.value }
            })}
            className="input-field"
            rows="3"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={settings.general.language}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, language: e.target.value }
              })}
              className="input-field"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={settings.general.currency}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, currency: e.target.value }
              })}
              className="input-field"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => handleSave('General')} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, emailNotifications: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Order Updates</p>
                <p className="text-sm text-gray-600">Get notified about order status changes</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.orderUpdates}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, orderUpdates: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Inventory Alerts</p>
                <p className="text-sm text-gray-600">Receive alerts for low stock items</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.inventoryAlerts}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, inventoryAlerts: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Supplier Updates</p>
                <p className="text-sm text-gray-600">Updates from your suppliers</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.supplierUpdates}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, supplierUpdates: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Weekly Reports</p>
                <p className="text-sm text-gray-600">Receive weekly performance reports</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.weeklyReports}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, weeklyReports: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Monthly Reports</p>
                <p className="text-sm text-gray-600">Receive monthly analytics reports</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.monthlyReports}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, monthlyReports: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => handleSave('Notification')} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, twoFactorAuth: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, sessionTimeout: e.target.value }
              })}
              className="input-field"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
            <select
              value={settings.security.passwordExpiry}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, passwordExpiry: e.target.value }
              })}
              className="input-field"
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
        <button className="btn-outline">Change Password</button>
      </div>

      <div className="flex justify-end">
        <button onClick={() => handleSave('Security')} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const IntegrationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">External Services</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Email Service</p>
                <p className="text-sm text-gray-600">Enable email sending capabilities</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.integrations.emailService}
              onChange={(e) => setSettings({
                ...settings,
                integrations: { ...settings.integrations, emailService: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">SMS Service</p>
                <p className="text-sm text-gray-600">Enable SMS notifications</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.integrations.smsService}
              onChange={(e) => setSettings({
                ...settings,
                integrations: { ...settings.integrations, smsService: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Analytics Tracking</p>
                <p className="text-sm text-gray-600">Track user behavior and system performance</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.integrations.analyticsTracking}
              onChange={(e) => setSettings({
                ...settings,
                integrations: { ...settings.integrations, analyticsTracking: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Automatic Backups</p>
                <p className="text-sm text-gray-600">Enable daily automated backups</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.integrations.backupEnabled}
              onChange={(e) => setSettings({
                ...settings,
                integrations: { ...settings.integrations, backupEnabled: e.target.checked }
              })}
              className="w-5 h-5 text-primary-600 rounded"
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => handleSave('Integration')} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your application preferences and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="card">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'integrations' && <IntegrationSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
