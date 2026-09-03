import type { AppManifest } from '@ankhorage/contracts';

import {
  createScreen,
  createScreenRoot,
  createSection,
  createZoraNode,
  type ZoraNode,
} from '../../../../shared';
import type { EbankingMobileScreenIds } from './routes';

function createIdSegment(value: string): string {
  const segment = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return segment || 'section';
}

interface EbankingMobileCard {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

interface EbankingMobileNotice {
  readonly title: string;
  readonly description: string;
  readonly color: 'success' | 'info' | 'warning' | 'error';
}

interface EbankingMobileSection {
  readonly title: string;
  readonly description: string;
  readonly items: readonly (EbankingMobileCard | EbankingMobileNotice)[];
}

function createCardNode(idPrefix: string, card: EbankingMobileCard, cardIndex: number): ZoraNode {
  return createZoraNode(
    `${idPrefix}-card-${cardIndex + 1}`,
    'Card',
    {
      eyebrow: card.eyebrow,
      title: card.title,
      description: card.description,
      tone: 'outline',
    },
  );
}

function createNoticeNode(
  idPrefix: string,
  notice: EbankingMobileNotice,
  noticeIndex: number,
): ZoraNode {
  return createZoraNode(
    `${idPrefix}-notice-${noticeIndex + 1}`,
    'Notice',
    {
      title: notice.title,
      description: notice.description,
      color: notice.color,
    },
  );
}

function createSectionWithPanel(
  idPrefix: string,
  section: EbankingMobileSection,
): ZoraNode {
  const idSegment = createIdSegment(section.title);
  const panelId = `${idPrefix}-${idSegment}-panel`;

  const children: ZoraNode[] = [];
  let cardIndex = 0;
  let noticeIndex = 0;

  for (const item of section.items) {
    if ('color' in item) {
      children.push(createNoticeNode(panelId, item, noticeIndex));
      noticeIndex += 1;
    } else {
      children.push(createCardNode(panelId, item, cardIndex));
      cardIndex += 1;
    }
  }

  return createSection(
    `${idPrefix}-${idSegment}`,
    {
      title: section.title,
      description: section.description,
    },
    [
      createZoraNode(panelId, 'Panel', {
        title: section.title,
        description: section.description,
        tone: 'subtle',
      }, children),
    ],
  );
}

export function createEbankingMobileScreens(
  idPrefix: string,
  screenIds: EbankingMobileScreenIds,
): AppManifest['screens'] {
  const homeSections: readonly EbankingMobileSection[] = [
    {
      title: 'Balances',
      description: 'Your current account position.',
      items: [
        { eyebrow: 'Balance', title: 'Total balance', description: 'Available cash and linked account value.' },
        { eyebrow: 'Available', title: 'Available now', description: 'Spendable funds after pending activity.' },
      ],
    },
    {
      title: 'Quick actions',
      description: 'Common money movement tasks.',
      items: [
        { eyebrow: 'Transfer', title: 'Transfer', description: 'Move money between accounts.' },
        { eyebrow: 'Pay', title: 'Pay', description: 'Pay bills and invoices.' },
        { eyebrow: 'Deposit', title: 'Deposit', description: 'Add funds to your account.' },
      ],
    },
    {
      title: 'Upcoming payments',
      description: 'Scheduled obligations and due dates.',
      items: [
        { eyebrow: 'Due soon', title: 'Rent', description: 'Due May 25.' },
        { eyebrow: 'Upcoming', title: 'Internet', description: 'Due May 28.' },
      ],
    },
    {
      title: 'Recent activity',
      description: 'Latest account movements.',
      items: [
        { eyebrow: 'Card', title: 'Whole Foods Market', description: 'Pending card purchase.' },
        { eyebrow: 'Deposit', title: 'Employer payroll', description: 'Completed incoming payment.' },
      ],
    },
  ];

  const assetsSections: readonly EbankingMobileSection[] = [
    {
      title: 'Net worth',
      description: 'Total value across your accounts.',
      items: [
        { eyebrow: 'Total', title: 'Net worth', description: 'Current value across linked assets.' },
      ],
    },
    {
      title: 'Allocation',
      description: 'Checking, savings, and credit composition.',
      items: [
        { eyebrow: 'Checking', title: 'Checking', description: 'Primary spending account.' },
        { eyebrow: 'Savings', title: 'Savings', description: 'Emergency fund and goals.' },
        { eyebrow: 'Credit', title: 'Credit', description: 'Outstanding credit position.' },
      ],
    },
    {
      title: 'Accounts',
      description: 'Manage linked accounts.',
      items: [
        { eyebrow: 'Add', title: 'Add account', description: 'Link a new account.' },
      ],
    },
  ];

  const paymentsSections: readonly EbankingMobileSection[] = [
    {
      title: 'Actions',
      description: 'Start a payment flow.',
      items: [
        { eyebrow: 'Transfer', title: 'Transfer', description: 'Send money.' },
        { eyebrow: 'Bill', title: 'Pay a bill', description: 'Pay an invoice.' },
      ],
    },
    {
      title: 'Scheduled payments',
      description: 'Upcoming obligations and recurring payments.',
      items: [
        { eyebrow: 'Scheduled', title: 'Rent payment', description: 'Due May 25.' },
        { eyebrow: 'Scheduled', title: 'Hydro bill', description: 'Due May 28.' },
        { eyebrow: 'Scheduled', title: 'Mobile plan', description: 'Due May 30.' },
      ],
    },
    {
      title: 'Recent recipients',
      description: 'Trusted destinations for faster transfers.',
      items: [
        { eyebrow: 'Recipient', title: 'James Miller', description: 'Verified recipient.' },
        { eyebrow: 'Recipient', title: 'Sophia Patel', description: 'Verified recipient.' },
      ],
    },
  ];

  const investSections: readonly EbankingMobileSection[] = [
    {
      title: 'Portfolio value',
      description: 'Performance over time.',
      items: [
        { eyebrow: 'Value', title: 'Portfolio value', description: 'Value as of today.' },
        { eyebrow: 'Range', title: '1M', description: 'One month performance.' },
        { eyebrow: 'Range', title: '6M', description: 'Six month performance.' },
        { eyebrow: 'Range', title: '1Y', description: 'One year performance.' },
      ],
    },
    {
      title: 'Return',
      description: 'Performance summary.',
      items: [
        { eyebrow: 'Performance', title: 'Return', description: 'Past-year return.' },
      ],
    },
    {
      title: 'Holdings',
      description: 'Diversified positions at a glance.',
      items: [
        { eyebrow: 'Stocks', title: 'U.S. stocks', description: 'Diversified equity position.' },
        { eyebrow: 'Stocks', title: 'International stocks', description: 'Global equity position.' },
        { eyebrow: 'Stability', title: 'Bonds', description: 'Stability allocation.' },
        { eyebrow: 'Liquidity', title: 'Cash & cash equivalents', description: 'Liquidity reserve.' },
      ],
    },
  ];

  const moreSections: readonly EbankingMobileSection[] = [
    {
      title: 'Profile & security',
      description: 'Keep account access visible and protected.',
      items: [
        { eyebrow: 'Profile', title: 'Welcome back', description: 'Review your profile.' },
        {
          title: 'Your account is secure',
          description: 'We are monitoring your account and will notify you of important activity.',
          color: 'success',
        },
      ],
    },
    {
      title: 'Settings',
      description: 'Manage preferences and trusted access.',
      items: [
        { eyebrow: 'Security', title: 'Security', description: 'Passcode and device controls.' },
        { eyebrow: 'Notifications', title: 'Notifications', description: 'Alerts and delivery preferences.' },
        { eyebrow: 'Beneficiaries', title: 'Beneficiaries', description: 'Manage trusted recipients.' },
        { eyebrow: 'Support', title: 'Help and support', description: 'Get assistance.' },
      ],
    },
  ];

  const homeScreen = createScreen({
    id: screenIds.home,
    name: 'Home',
    title: 'E-banking overview',
    description: 'Balances, quick actions, and upcoming activity at a glance.',
    root: createScreenRoot(`${idPrefix}-home-screen`, { width: 'narrow', scroll: true }, [
      createZoraNode(`${idPrefix}-home-header`, 'SectionHeader', {
        eyebrow: 'Cash overview',
        title: 'Good morning, Alex',
        description: 'Secure view of your money and next actions.',
      }),
      ...homeSections.map((section) => createSectionWithPanel(`${idPrefix}-home`, section)),
    ]),
  });

  const assetsScreen = createScreen({
    id: screenIds.assets,
    name: 'Assets',
    title: 'Assets',
    description: 'Net worth, account allocation, and linked accounts.',
    root: createScreenRoot(`${idPrefix}-assets-screen`, { width: 'narrow', scroll: true }, [
      createZoraNode(`${idPrefix}-assets-header`, 'SectionHeader', {
        eyebrow: 'Portfolio',
        title: 'Assets',
        description: 'See how your money is distributed.',
      }),
      ...assetsSections.map((section) => createSectionWithPanel(`${idPrefix}-assets`, section)),
    ]),
  });

  const paymentsScreen = createScreen({
    id: screenIds.payments,
    name: 'Payments',
    title: 'Payments',
    description: 'Transfer funds, pay bills, and review scheduled payments.',
    root: createScreenRoot(`${idPrefix}-payments-screen`, { width: 'narrow', scroll: true }, [
      createZoraNode(`${idPrefix}-payments-header`, 'SectionHeader', {
        eyebrow: 'Money movement',
        title: 'Payments',
        description: 'Send and schedule payments securely.',
      }),
      ...paymentsSections.map((section) => createSectionWithPanel(`${idPrefix}-payments`, section)),
    ]),
  });

  const investScreen = createScreen({
    id: screenIds.invest,
    name: 'Invest',
    title: 'Invest',
    description: 'Portfolio value, returns, and diversified holdings.',
    root: createScreenRoot(`${idPrefix}-invest-screen`, { width: 'narrow', scroll: true }, [
      createZoraNode(`${idPrefix}-invest-header`, 'SectionHeader', {
        eyebrow: 'Portfolio',
        title: 'Invest',
        description: 'Track long-term progress with measured context.',
      }),
      ...investSections.map((section) => createSectionWithPanel(`${idPrefix}-invest`, section)),
    ]),
  });

  const moreScreen = createScreen({
    id: screenIds.more,
    name: 'More',
    title: 'More',
    description: 'Profile, security, support, and account preferences.',
    root: createScreenRoot(`${idPrefix}-more-screen`, { width: 'narrow', scroll: true }, [
      createZoraNode(`${idPrefix}-more-header`, 'SectionHeader', {
        eyebrow: 'Account',
        title: 'More',
        description: 'Manage your profile and security.',
      }),
      ...moreSections.map((section) => createSectionWithPanel(`${idPrefix}-more`, section)),
    ]),
  });

  return {
    [screenIds.home]: homeScreen,
    [screenIds.assets]: assetsScreen,
    [screenIds.payments]: paymentsScreen,
    [screenIds.invest]: investScreen,
    [screenIds.more]: moreScreen,
  };
}
