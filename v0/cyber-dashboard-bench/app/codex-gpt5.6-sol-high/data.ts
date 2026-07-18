export type ScenarioKey = "high" | "steady" | "cleared"

export type PathStatus =
  "needs_decision" | "planned" | "in_progress" | "verified"

export type EvidenceState = "observed" | "inferred" | "assumed"

export interface PathStep {
  id: string
  kind: "entry" | "secret" | "workload" | "identity" | "target"
  label: string
  meta: string
  state: EvidenceState
  technique: string
  evidenceTitle: string
  evidenceDetail: string
  source: string
  freshness: string
}

export interface ScoreFactor {
  label: string
  value: number
  reason: string
}

export interface ControlCut {
  id: string
  title: string
  description: string
  owner: string
  effort: string
  effortMinutes: number
  pathsBroken: number
  assetsIsolated: number
  confidence: number
  stepId: string
  recommended?: boolean
  validation: string
  rollback: string
}

export interface BreachPath {
  id: string
  priority: number
  action: "Act now" | "Attend" | "Track"
  title: string
  target: string
  targetType: string
  summary: string
  change: string
  status: PathStatus
  owner: string
  due: string
  criticalAssets: number
  evidenceTags: string[]
  factors: ScoreFactor[]
  steps: PathStep[]
  cuts: ControlCut[]
}

export interface Scenario {
  key: ScenarioKey
  label: string
  shortLabel: string
  coverage: number
  sourceStatus: string
  sourceDetail: string
  attention: string
  metrics: {
    paths: number
    assets: number
    owned: number
    overdue: number
    weightedExposure: number
  }
  trend: number[]
  paths: BreachPath[]
}

export const ownerOptions = [
  "Cloud Platform",
  "Identity Engineering",
  "Developer Experience",
  "Security Engineering",
]

export const paths: BreachPath[] = [
  {
    id: "path-ci-ledger",
    priority: 94,
    action: "Act now",
    title: "Public CI token reaches production ledger",
    target: "Customer Ledger / prod-eu",
    targetType: "Tier 0 data service",
    summary:
      "A deploy token committed to a public demo repository can authenticate as ci-deploy, assume ProdAdmin, and administer the customer ledger.",
    change: "+12 since yesterday",
    status: "needs_decision",
    owner: "Unassigned",
    due: "Decision due today",
    criticalAssets: 2,
    evidenceTags: ["Observed secret", "Identity pivot", "4 paths converge"],
    factors: [
      {
        label: "Reachability",
        value: 100,
        reason: "Repository and token are reachable without corporate access.",
      },
      {
        label: "Threat evidence",
        value: 88,
        reason:
          "The exposed credential is valid in the seeded evidence snapshot.",
      },
      {
        label: "Business impact",
        value: 98,
        reason: "ProdAdmin can alter the Tier 0 customer ledger and backups.",
      },
      {
        label: "Convergence",
        value: 92,
        reason: "The same trust policy enables four modeled breach paths.",
      },
      {
        label: "Evidence confidence",
        value: 86,
        reason: "Four relationships are observed; one is inferred from policy.",
      },
    ],
    steps: [
      {
        id: "repo",
        kind: "entry",
        label: "Public repository",
        meta: "checkout-demo",
        state: "observed",
        technique: "Initial access",
        evidenceTitle: "Repository is publicly readable",
        evidenceDetail:
          "Seeded Git provider metadata reports anonymous read access to the repository.",
        source: "Git provider",
        freshness: "12 min ago",
      },
      {
        id: "token",
        kind: "secret",
        label: "Deploy token",
        meta: "DEPLOY_TOKEN",
        state: "observed",
        technique: "Credential access",
        evidenceTitle: "Valid token material detected",
        evidenceDetail:
          "A seeded secret-scanning result links the token fingerprint to ci-deploy. The demo never stores a real secret value.",
        source: "Secret scanner",
        freshness: "12 min ago",
      },
      {
        id: "ci-identity",
        kind: "workload",
        label: "Workload identity",
        meta: "ci-deploy",
        state: "observed",
        technique: "Valid accounts",
        evidenceTitle: "Token authenticates as ci-deploy",
        evidenceDetail:
          "The identity provider snapshot associates the token fingerprint with the ci-deploy service principal.",
        source: "Entra ID",
        freshness: "8 min ago",
      },
      {
        id: "prod-admin",
        kind: "identity",
        label: "Admin role",
        meta: "ProdAdmin",
        state: "inferred",
        technique: "Privilege escalation",
        evidenceTitle: "Trust policy permits role assumption",
        evidenceDetail:
          "The cloud policy allows ci-deploy to assume ProdAdmin. Effective access is inferred from the policy graph.",
        source: "AWS IAM",
        freshness: "9 min ago",
      },
      {
        id: "ledger",
        kind: "target",
        label: "Critical target",
        meta: "Customer Ledger",
        state: "observed",
        technique: "Impact",
        evidenceTitle: "ProdAdmin can administer the ledger",
        evidenceDetail:
          "The service catalog marks the ledger Tier 0. The attached policy grants database administration and backup deletion.",
        source: "AWS + service catalog",
        freshness: "9 min ago",
      },
    ],
    cuts: [
      {
        id: "cut-trust",
        title: "Remove ci-deploy from ProdAdmin trust",
        description:
          "Narrow the role trust policy to the release broker and keep ci-deploy scoped to staging.",
        owner: "Identity Engineering",
        effort: "18 min",
        effortMinutes: 18,
        pathsBroken: 4,
        assetsIsolated: 2,
        confidence: 94,
        stepId: "prod-admin",
        recommended: true,
        validation:
          "Re-evaluate effective permissions and run the production release smoke test through the broker.",
        rollback:
          "Restore the previous policy version from IAM policy history.",
      },
      {
        id: "cut-token",
        title: "Revoke and rotate the deploy token",
        description:
          "Invalidate the exposed credential and replace it with a short-lived brokered token.",
        owner: "Developer Experience",
        effort: "35 min",
        effortMinutes: 35,
        pathsBroken: 2,
        assetsIsolated: 1,
        confidence: 97,
        stepId: "token",
        validation:
          "Confirm the old fingerprint fails authentication and the release pipeline receives a short-lived token.",
        rollback:
          "Issue a time-boxed emergency credential through the release broker.",
      },
      {
        id: "cut-repo",
        title: "Restrict repository visibility",
        description:
          "Make the repository private and add pre-commit secret protection to the organization policy.",
        owner: "Developer Experience",
        effort: "2 hr",
        effortMinutes: 120,
        pathsBroken: 1,
        assetsIsolated: 0,
        confidence: 88,
        stepId: "repo",
        validation:
          "Test anonymous access and confirm the organization secret-scanning rule is enforced.",
        rollback: "Reopen only the sanitized repository after security review.",
      },
    ],
  },
  {
    id: "path-wiki-signing",
    priority: 91,
    action: "Act now",
    title: "Known-exploited wiki flaw reaches signing keys",
    target: "Release Signing Vault",
    targetType: "Tier 0 secrets service",
    summary:
      "An internet-facing collaboration node with a seeded KEV match can reach automation-svc, which inherits secrets administration.",
    change: "New KEV evidence",
    status: "in_progress",
    owner: "Cloud Platform",
    due: "Due in 6 hours",
    criticalAssets: 1,
    evidenceTags: ["CISA KEV", "EPSS 97th pct", "Internet-facing"],
    factors: [
      {
        label: "Reachability",
        value: 96,
        reason:
          "The collaboration node is internet-facing on an allowed route.",
      },
      {
        label: "Threat evidence",
        value: 100,
        reason:
          "The seeded vulnerability record is marked as a CISA KEV match.",
      },
      {
        label: "Business impact",
        value: 96,
        reason: "Signing-key administration can compromise trusted releases.",
      },
      {
        label: "Convergence",
        value: 70,
        reason: "Two modeled paths use the same automation identity.",
      },
      {
        label: "Evidence confidence",
        value: 91,
        reason:
          "Asset, vulnerability, route, and permission edges are observed.",
      },
    ],
    steps: [
      {
        id: "wiki-edge",
        kind: "entry",
        label: "Internet route",
        meta: "wiki.example.test",
        state: "observed",
        technique: "Initial access",
        evidenceTitle: "Public route observed",
        evidenceDetail:
          "The seeded cloud inventory exposes the wiki load balancer to the internet.",
        source: "Azure",
        freshness: "21 min ago",
      },
      {
        id: "wiki-vuln",
        kind: "workload",
        label: "Wiki node",
        meta: "wiki-prod-2",
        state: "observed",
        technique: "Exploit public-facing app",
        evidenceTitle: "Known-exploited vulnerability match",
        evidenceDetail:
          "The demo vulnerability snapshot marks the installed version as matching a CISA KEV entry.",
        source: "VM scanner + CISA KEV",
        freshness: "31 min ago",
      },
      {
        id: "automation",
        kind: "identity",
        label: "Managed identity",
        meta: "automation-svc",
        state: "observed",
        technique: "Valid accounts",
        evidenceTitle: "Managed identity attached",
        evidenceDetail:
          "The workload configuration directly attaches automation-svc to the wiki node.",
        source: "Azure",
        freshness: "21 min ago",
      },
      {
        id: "secrets-admin",
        kind: "identity",
        label: "Inherited role",
        meta: "Secrets Administrator",
        state: "observed",
        technique: "Privilege escalation",
        evidenceTitle: "Subscription role inheritance",
        evidenceDetail:
          "automation-svc inherits Secrets Administrator from a subscription-level group.",
        source: "Entra ID",
        freshness: "18 min ago",
      },
      {
        id: "signing-vault",
        kind: "target",
        label: "Critical target",
        meta: "Release Signing Vault",
        state: "observed",
        technique: "Impact",
        evidenceTitle: "Signing keys are in scope",
        evidenceDetail:
          "The Tier 0 vault is within the inherited role scope and stores production release keys.",
        source: "Service catalog + Azure",
        freshness: "18 min ago",
      },
    ],
    cuts: [
      {
        id: "cut-wiki-role",
        title: "Remove inherited secrets administration",
        description:
          "Replace the subscription-level role with a vault-specific reader assignment.",
        owner: "Identity Engineering",
        effort: "24 min",
        effortMinutes: 24,
        pathsBroken: 2,
        assetsIsolated: 1,
        confidence: 96,
        stepId: "secrets-admin",
        recommended: true,
        validation:
          "Query effective access and confirm automation-svc cannot enumerate signing keys.",
        rollback:
          "Restore the group assignment for a time-boxed emergency window.",
      },
      {
        id: "cut-wiki-patch",
        title: "Patch and recycle wiki-prod-2",
        description:
          "Apply the vendor-fixed build and replace the exposed node through the deployment group.",
        owner: "Cloud Platform",
        effort: "45 min",
        effortMinutes: 45,
        pathsBroken: 1,
        assetsIsolated: 1,
        confidence: 98,
        stepId: "wiki-vuln",
        validation:
          "Confirm the fixed version and re-run the vulnerability and route checks.",
        rollback:
          "Shift traffic to the previous isolated image if application health checks fail.",
      },
    ],
  },
  {
    id: "path-contractor-exports",
    priority: 78,
    action: "Attend",
    title: "Dormant contractor can export support data",
    target: "Support Exports",
    targetType: "Sensitive data store",
    summary:
      "A dormant external account remains in a nested support group that can mint export links for sensitive customer cases.",
    change: "Unchanged for 9 days",
    status: "needs_decision",
    owner: "Identity Engineering",
    due: "Due tomorrow",
    criticalAssets: 1,
    evidenceTags: ["Dormant identity", "Nested group", "No MFA"],
    factors: [
      {
        label: "Reachability",
        value: 74,
        reason:
          "The identity can authenticate externally but has no recent session.",
      },
      {
        label: "Threat evidence",
        value: 61,
        reason:
          "No compromise evidence; credential age and missing MFA raise concern.",
      },
      {
        label: "Business impact",
        value: 84,
        reason: "The export store contains sensitive support attachments.",
      },
      {
        label: "Convergence",
        value: 58,
        reason: "The nested group grants access to two sensitive services.",
      },
      {
        label: "Evidence confidence",
        value: 93,
        reason:
          "Identity, group membership, and application access are observed.",
      },
    ],
    steps: [
      {
        id: "contractor",
        kind: "entry",
        label: "External identity",
        meta: "sam.contractor",
        state: "observed",
        technique: "Valid accounts",
        evidenceTitle: "Dormant external account",
        evidenceDetail:
          "The seeded identity record has had no interactive sign-in for 96 days and no MFA method.",
        source: "Entra ID",
        freshness: "34 min ago",
      },
      {
        id: "support-group",
        kind: "identity",
        label: "Nested group",
        meta: "Support-L2-External",
        state: "observed",
        technique: "Account discovery",
        evidenceTitle: "Nested membership remains active",
        evidenceDetail:
          "The contractor is indirectly included through a project group that was not expired.",
        source: "Entra ID",
        freshness: "34 min ago",
      },
      {
        id: "support-app",
        kind: "workload",
        label: "Support console",
        meta: "case-console",
        state: "observed",
        technique: "Collection",
        evidenceTitle: "Export permission granted",
        evidenceDetail:
          "The L2 external group can generate download links from the support console.",
        source: "SaaS access catalog",
        freshness: "2 hr ago",
      },
      {
        id: "support-target",
        kind: "target",
        label: "Sensitive target",
        meta: "Support Exports",
        state: "inferred",
        technique: "Exfiltration",
        evidenceTitle: "Export store follows application permission",
        evidenceDetail:
          "The path to the backing store is inferred from the support application's export entitlement.",
        source: "Service catalog",
        freshness: "2 hr ago",
      },
    ],
    cuts: [
      {
        id: "cut-contractor",
        title: "Expire the contractor's project access",
        description:
          "Remove the dormant account from the project group and enforce expiry on external memberships.",
        owner: "Identity Engineering",
        effort: "12 min",
        effortMinutes: 12,
        pathsBroken: 2,
        assetsIsolated: 1,
        confidence: 98,
        stepId: "support-group",
        recommended: true,
        validation:
          "Confirm the account has no effective application assignments and cannot sign in.",
        rollback:
          "Re-add the account with manager approval and a seven-day expiry.",
      },
    ],
  },
  {
    id: "path-function-archive",
    priority: 67,
    action: "Track",
    title: "Public function can read billing archive",
    target: "Billing Archive",
    targetType: "Confidential object store",
    summary:
      "A public function URL invokes a workload role with wildcard read access to the billing archive.",
    change: "-4 after policy change",
    status: "planned",
    owner: "Cloud Platform",
    due: "Due in 4 days",
    criticalAssets: 1,
    evidenceTags: ["Public endpoint", "Wildcard read", "Compensating WAF"],
    factors: [
      {
        label: "Reachability",
        value: 76,
        reason: "The endpoint is public but protected by a seeded WAF policy.",
      },
      {
        label: "Threat evidence",
        value: 52,
        reason: "No exploitation signal; abuse requires a valid request shape.",
      },
      {
        label: "Business impact",
        value: 74,
        reason: "The archive contains confidential billing documents.",
      },
      {
        label: "Convergence",
        value: 44,
        reason: "The wildcard role appears in one other low-impact path.",
      },
      {
        label: "Evidence confidence",
        value: 89,
        reason: "The endpoint, role, WAF, and bucket policy are observed.",
      },
    ],
    steps: [
      {
        id: "function-url",
        kind: "entry",
        label: "Public function URL",
        meta: "invoice-preview",
        state: "observed",
        technique: "Initial access",
        evidenceTitle: "Anonymous invocation enabled",
        evidenceDetail:
          "The seeded cloud inventory reports an unauthenticated function URL behind a WAF.",
        source: "AWS",
        freshness: "16 min ago",
      },
      {
        id: "function-role",
        kind: "identity",
        label: "Execution role",
        meta: "invoice-preview-role",
        state: "observed",
        technique: "Valid accounts",
        evidenceTitle: "Wildcard object read",
        evidenceDetail:
          "The execution role can read objects across the billing archive prefix.",
        source: "AWS IAM",
        freshness: "16 min ago",
      },
      {
        id: "archive",
        kind: "target",
        label: "Confidential target",
        meta: "Billing Archive",
        state: "observed",
        technique: "Collection",
        evidenceTitle: "Archive contains confidential records",
        evidenceDetail:
          "The service catalog classifies the bucket as confidential with a seven-year retention policy.",
        source: "Service catalog",
        freshness: "1 hr ago",
      },
    ],
    cuts: [
      {
        id: "cut-bucket-scope",
        title: "Scope the role to preview objects",
        description:
          "Replace wildcard read with the generated-preview prefix and explicit object actions.",
        owner: "Cloud Platform",
        effort: "28 min",
        effortMinutes: 28,
        pathsBroken: 2,
        assetsIsolated: 1,
        confidence: 95,
        stepId: "function-role",
        recommended: true,
        validation:
          "Run preview tests and confirm denied access outside the generated-preview prefix.",
        rollback:
          "Restore the prior policy version while the endpoint remains behind the WAF.",
      },
    ],
  },
]

export const scenarios: Record<ScenarioKey, Scenario> = {
  high: {
    key: "high",
    label: "High attention",
    shortLabel: "High",
    coverage: 92,
    sourceStatus: "5 / 5 sources fresh",
    sourceDetail: "Last graph refresh 8 minutes ago",
    attention:
      "New identity evidence raised the CI-to-ledger path by 12 points. One decision is due today.",
    metrics: {
      paths: 4,
      assets: 4,
      owned: 3,
      overdue: 1,
      weightedExposure: 82,
    },
    trend: [7, 7, 6, 6, 5, 4, 4],
    paths,
  },
  steady: {
    key: "steady",
    label: "Steady state",
    shortLabel: "Steady",
    coverage: 96,
    sourceStatus: "5 / 5 sources fresh",
    sourceDetail: "Last graph refresh 11 minutes ago",
    attention:
      "No material increase since yesterday. Both open paths have owners and verification plans.",
    metrics: {
      paths: 2,
      assets: 2,
      owned: 2,
      overdue: 0,
      weightedExposure: 54,
    },
    trend: [5, 4, 4, 3, 3, 2, 2],
    paths: [paths[1], paths[3]],
  },
  cleared: {
    key: "cleared",
    label: "Cleared state",
    shortLabel: "Cleared",
    coverage: 96,
    sourceStatus: "5 / 5 sources fresh",
    sourceDetail: "Last graph refresh 6 minutes ago",
    attention:
      "No modeled path currently reaches a confirmed critical asset. Two recent changes remain under verification.",
    metrics: {
      paths: 0,
      assets: 0,
      owned: 0,
      overdue: 0,
      weightedExposure: 18,
    },
    trend: [4, 4, 3, 2, 1, 1, 0],
    paths: [],
  },
}

export const criticalAssets = [
  {
    name: "Customer Ledger",
    type: "Tier 0 data service",
    owner: "Payments Platform",
    environment: "AWS · prod-eu",
    paths: 1,
    status: "Reachable",
  },
  {
    name: "Release Signing Vault",
    type: "Tier 0 secrets service",
    owner: "Developer Experience",
    environment: "Azure · production",
    paths: 1,
    status: "In remediation",
  },
  {
    name: "Support Exports",
    type: "Sensitive data store",
    owner: "Customer Operations",
    environment: "SaaS · global",
    paths: 1,
    status: "Reachable",
  },
  {
    name: "Billing Archive",
    type: "Confidential object store",
    owner: "Finance Systems",
    environment: "AWS · prod-us",
    paths: 1,
    status: "Planned",
  },
]

export const baseActivity = [
  {
    time: "09:42",
    title: "Priority changed",
    detail:
      "CI-to-ledger path increased after a valid token relationship was observed.",
    actor: "Exposure model",
  },
  {
    time: "09:18",
    title: "Remediation in progress",
    detail: "Cloud Platform accepted the wiki node patch and role review.",
    actor: "Maya Chen",
  },
  {
    time: "Yesterday",
    title: "Control cut verified",
    detail:
      "A stale support automation role no longer reaches the customer profile store.",
    actor: "Evidence refresh",
  },
  {
    time: "Mon",
    title: "Critical asset owner confirmed",
    detail: "Payments Platform confirmed ownership of Customer Ledger.",
    actor: "Service catalog",
  },
]
