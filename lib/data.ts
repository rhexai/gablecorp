export const capabilities = [
    {
        title: "Strategy & Corporate Finance",
        slug: "strategy-corporate-finance",
        description: "Building resilience and capturing value in a volatile global economy.",
        longDescription: "In an era of unprecedented volatility, strategy is more important than ever. We help clients build resilience, identify new growth opportunities, and allocate resources effectively to capture value. our approach combines deep industry expertise with rigorous analytical methods to deliver actionable insights.",
        features: ["Corporate Strategy", "M&A", "CFO Excellence", "Capital Projects"]
    },
    {
        title: "Digital & Analytics",
        slug: "digital-analytics",
        description: "Harnessing the power of data and AI to transform core operations.",
        longDescription: "Digital and AI are reshaping every industry. We help organizations harness the power of these technologies to transform their core operations, create new business models, and drive sustainable growth. From data strategy to AI implementation, we partner with clients to deliver real impact.",
        features: ["AI & Machine Learning", "Data Strategy", "Digital Business Building", "Enterprise Architecture"]
    },
    {
        title: "Sustainability",
        slug: "sustainability",
        description: "Integrating environmental, social, and governance goals into business strategy.",
        longDescription: "Sustainability is no longer just a compliance issue; it is a strategic imperative. We help clients integrate environmental, social, and governance (ESG) goals into their core business strategy, enabling them to create long-term value for all stakeholders.",
        features: ["Net Zero Strategy", "Green Business Building", "Sustainable Investing", "ESG Risk Management"]
    },
    {
        title: "Transformation",
        slug: "transformation",
        description: "Driving holistic change to unlock potential and performance.",
        longDescription: "Successful transformations require a holistic approach that addresses strategy, operations, technology, and culture. We work with clients to drive comprehensive change programs that unlock potential, improve performance, and ensure long-term sustainability.",
        features: ["Holistic Performance Transformation", "Restructuring", "Organizational Design", "Change Management"]
    },
    {
        title: "Operations",
        slug: "operations",
        description: "Optimizing supply chains and manufacturing for the next era of industry.",
        longDescription: "Operations are the engine of any organization. We help clients optimize their supply chains, manufacturing processes, and service operations to improve efficiency, quality, and agility. Our experts bring deep technical knowledge and practical experience to every engagement.",
        features: ["Supply Chain Power", "Manufacturing 4.0", "Service Operations", "Capital Excellence"]
    },
    {
        title: "Marketing & Sales",
        slug: "marketing-sales",
        description: "Reimagining customer experiences to drive growth and loyalty.",
        longDescription: "In a world of increasing customer expectations, marketing and sales must be more data-driven, personalized, and agile. We help clients reimagine their customer experiences, optimize their go-to-market strategies, and drive growth through innovation.",
        features: ["Customer Experience", "Growth Strategy", "Pricing", "Sales Excellence"]
    },
];

export const industries = [
    "Advanced Electronics",
    "Aerospace & Defense",
    "Agriculture",
    "Automotive & Assembly",
    "Banking",
    "Chemicals",
    "Consumer Packaged Goods",
    "Education",
    "Electric Power & Natural Gas",
    "Engineering, Construction & Building Materials",
    "Financial Services",
    "Healthcare Systems & Services",
    "Life Sciences",
    "Metals & Mining",
    "Oil & Gas",
    "Public Sector",
    "Retail",
    "Technology, Media & Telecommunications",
    "Travel, Logistics & Infrastructure"
];

export const dashboardServices = [
    {
        name: "BPO",
        slug: "bpo",
        description: "Focus on your core business while we handle the rest. Our Business Process Outsourcing solutions provide scalable, reliable support for customer service, data entry, administrative tasks, and specialized operations. We plug seamlessly into your existing workflows to reduce overhead and improve efficiency without compromising on quality. \n\nWhether you need an extended customer support arm, a dedicated data entry team, or specialized back-office assistance, our trained professionals integrate directly into your proprietary systems. We emphasize rapid onboarding, strict SLA adherence, and continuous quality assurance to ensure that outsourcing feels less like handing off work and more like hiring a high-performing internal department.",
        packages: []
    },
    {
        name: "Accounting & Tax",
        slug: "accounting",
        description: "Ensure your finances are accurate, compliant, and optimized for growth. Our expert accountants manage everything from daily bookkeeping and payroll processing to complex quarterly tax filings and strategic financial planning, giving you peace of mind and clear visibility into your financial health.",
        packages: [
            { 
                name: "Essentials", 
                price: "GHS 1,500", 
                features: ["Virtual bookkeeping support", "Full Software", "Transaction Categorization", "Bank Reconciliation", "Month End Closing"] 
            },
            { 
                name: "Growth", 
                price: "GHS 2,000", 
                features: ["Virtual bookkeeping + tax support", "Custom Reporting", "Monthly Variance Analysis", "Basic Tax Strategy", "All Essentials Features"] 
            },
            { 
                name: "Scale", 
                price: "GHS 2,500", 
                features: ["Bookkeeping + Tax + Payroll", "Corporate Tax Reporting", "Sales Tax Reporting", "Priority Support", "All Growth Features", "Payroll Management"] 
            }
        ]
    },
    {
        name: "Marketing",
        slug: "marketing",
        description: "Transform your brand presence and acquire customers at scale. Our full-stack marketing team leverages data-driven strategies across SEO, paid advertising, content creation, and social media to systematically drive traffic, generate high-quality leads, and increase your revenue.",
        packages: [
            { name: "Social Media Starter", price: "GHS 7,500/mo", features: ["3 High-Quality Posts/Week", "Basic Community Management", "Monthly Performance Reporting", "Content Calendar Creation"] },
            { name: "Growth Engine", price: "GHS 18,000/mo", features: ["SEO & Content Strategy", "Paid Ads Management (Meta/Google)", "Email Marketing Sequences", "Weekly Strategy Calls"] },
            { name: "Fractional CMO", price: "Custom Quote", features: ["Full Marketing Strategy & Execution", "Internal Team Leadership", "Brand Positioning & Tracking", "Revenue Performance Forecasting"] }
        ]
    },
    {
        name: "Creative Design",
        slug: "creative",
        description: "Stand out in a crowded market with visual excellence. Our creative studio specializes in crafting compelling brand identities, stunning user interfaces, engaging video production, and conversion-optimized marketing collateral that resonates with your target audience.",
        packages: [
            { name: "Design Essentials", price: "GHS 5,000/mo", features: ["Logo Polish & Refresh", "Social Media Graphics Template", "Basic Marketing Collateral", "2 Revision Rounds"] },
            { name: "Brand Identity Pro", price: "GHS 15,000/mo", features: ["Comprehensive Brand Guidelines", "Presentation & Pitch Deck Design", "Digital Ad Asset Creation", "Unlimited Revisions (Fair Use)"] },
            { name: "Creative Studio", price: "Custom Quote", features: ["Video Editing & Animation", "UI/UX Application Design", "Dedicated Art Director", "Priority Request Flow"] }
        ]
    },
    {
        name: "Software Implementation",
        slug: "software",
        description: "Adopt new technologies smoothly and securely. Whether you are transitioning to a new ERP, setting up an enterprise CRM, or modernizing your internal tools, our implementation engineers ensure accurate data migration, secure configurations, and comprehensive team training.",
        packages: [
            { name: "System Setup", price: "Starting at GHS 12,000", features: ["Out-of-the-Box Configuration", "Basic User Provisioning", "Security Permissions Setup", "Standard Training Session"] },
            { name: "Guided Migration", price: "Custom Quote", features: ["Complex Data Migration", "Custom Workflow Automation", "Third-party Integration Setup", "Admin & End-User Training"] },
            { name: "Enterprise Rollout", price: "Custom Quote", features: ["Full Change Management Strategy", "Custom Middleware Development", "Ongoing Support SLA", "Dedicated Solutions Architect"] }
        ]
    },
    {
        name: "Incorporation",
        slug: "incorporation",
        description: "Launch your venture on a solid legal foundation. We navigate the bureaucratic complexities of business registration, compliance structuring, and legal documentation so you can focus entirely on building your product and acquiring your first customers.",
        packages: [
            { name: "Standard Formation", price: "GHS 6,000", features: ["Company Registration (GRA/RGD)", "Filing Fees Included", "Standard Articles of Incorporation", "TIN Acquisition"] },
            { name: "Premium Launch", price: "GHS 14,000", features: ["Standard Formation Features", "Custom Operating Agreement", "Registered Agent Service (1 Yr)", "Tax Clearance Setup"] },
            { name: "Foreign Qualification", price: "Custom Quote", features: ["Multi-jurisdictional Registration", "Complex Compliance Setup", "Consultation with Legal Partner", "Expedited Processing"] }
        ]
    },
    {
        name: "Consultancy",
        slug: "consultancy",
        description: "Unlock actionable insights to solve your most complex business challenges. Our veteran consultants bring decades of industry experience to help you optimize operations, navigate structural turnarounds, and map out sustainable, long-term growth strategies.",
        packages: [
            { name: "Strategy Session", price: "GHS 3,000/session", features: ["Intensive 1-on-1 Consultation", "Actionable 90-Day Roadmap", "Recorded Video Session", "Follow-up Email Support"] },
            { name: "Project Audit", price: "Starting at GHS 18,000", features: ["Deep Dive Process Analysis", "Bottleneck & Inefficiencies Mapping", "Vendor & Tech Stack Review", "Optimization Recommendations Deck"] },
            { name: "Retained Advisory", price: "Custom Quote", features: ["Weekly Strategic Guidance Calls", "On-demand Leadership Support", "Quarterly Executive Offsites", "Direct Access via WhatsApp/Slack"] }
        ]
    }
];
