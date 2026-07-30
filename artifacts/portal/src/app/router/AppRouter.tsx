import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import MainLayout from "../layouts/MainLayout";
import Transactions from "../../modules/transactions/pages/Transactions";
import GoldManagement from "../../modules/gold/pages/GoldManagement";
import SilverManagement from "../../modules/silver/pages/SilverManagement";
import KarigarManagement from "../../modules/karigar/pages/KarigarManagement";
import StockManagement from "../../modules/stock/pages/StockManagement";
import Dashboard from "../../modules/dashboard/pages/Dashboard";
import Reports from "../../modules/reports/pages/Reports";
import SalesManagement from "../../modules/sales/pages/SalesManagement";
import PurchaseManagement from "../../modules/purchase/pages/PurchaseManagement";
import DiamondQualityTracking from "../../modules/diamond/pages/DiamondQualityTracking";
import ComingSoon from "../../pages/ComingSoon";
import Accounts from "../../modules/accounts/pages/Accounts";

import BranchesPage from "../../modules/settings/pages/BranchesPage";
import ClientsPage from "../../modules/settings/pages/ClientsPage";
import VendorsPage from "../../modules/settings/pages/VendorsPage";
import KarigarPage from "../../modules/settings/pages/KarigarPage";
import GeneralPage from "../../modules/settings/pages/GeneralPage";
import TeamPage from "../../modules/settings/pages/TeamPage";

export default function AppRouter() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>

        <Route path="/dashboard">
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </Route>

        <Route path="/transactions">
          <MainLayout>
            <Transactions />
          </MainLayout>
        </Route>

        <Route path="/gold">
          <MainLayout>
            <GoldManagement />
          </MainLayout>
        </Route>

        <Route path="/silver">
          <MainLayout>
            <SilverManagement />
          </MainLayout>
        </Route>

        <Route path="/diamond">
          <MainLayout>
            <DiamondQualityTracking />
          </MainLayout>
        </Route>

        <Route path="/stock">
          <MainLayout>
            <StockManagement />
          </MainLayout>
        </Route>

        <Route path="/purchase">
          <MainLayout>
            <PurchaseManagement />
          </MainLayout>
        </Route>

        <Route path="/sales">
          <MainLayout>
            <SalesManagement />
          </MainLayout>
        </Route>

        <Route path="/karigar">
          <MainLayout>
            <KarigarManagement />
          </MainLayout>
        </Route>

        <Route path="/reports">
          <MainLayout>
            <Reports />
          </MainLayout>
        </Route>

        <Route path="/accounts">
          <MainLayout>
            <Accounts />
          </MainLayout>
        </Route>

        {/* Settings sub-routes */}
        <Route path="/settings">
          <Redirect to="/settings/branches" />
        </Route>

        <Route path="/settings/branches">
          <MainLayout>
            <BranchesPage />
          </MainLayout>
        </Route>

        <Route path="/settings/clients">
          <MainLayout>
            <ClientsPage />
          </MainLayout>
        </Route>

        <Route path="/settings/vendors">
          <MainLayout>
            <VendorsPage />
          </MainLayout>
        </Route>

        <Route path="/settings/karigar">
          <MainLayout>
            <KarigarPage />
          </MainLayout>
        </Route>

        <Route path="/settings/general">
          <MainLayout>
            <GeneralPage />
          </MainLayout>
        </Route>

        <Route path="/settings/team">
          <MainLayout>
            <TeamPage />
          </MainLayout>
        </Route>

        <Route>
          <MainLayout>
            <ComingSoon title="Page Not Found" />
          </MainLayout>
        </Route>
      </Switch>
    </WouterRouter>
  );
}
