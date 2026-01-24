declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2018-review/index.md": {
	id: "2018-review/index.md";
  slug: "2018-in-review";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"2019-01-30-a-handy-npm-script-for-creating-a-new-gatsby-blog-post/index.mdx": {
	id: "2019-01-30-a-handy-npm-script-for-creating-a-new-gatsby-blog-post/index.mdx";
  slug: "a-handy-npm-script-for-creating-a-new-gatsby-blog-post";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-02-08-transforming-exported-csv-data-for-use-in-a-chart/index.mdx": {
	id: "2019-02-08-transforming-exported-csv-data-for-use-in-a-chart/index.mdx";
  slug: "transforming-exported-csv-data-for-use-in-a-chart";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-02-24-badass-making-users-awesome/index.mdx": {
	id: "2019-02-24-badass-making-users-awesome/index.mdx";
  slug: "badass-making-users-awesome-by-kathy-sierra";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-02-24-my-blog-is-a-digital-garden-not-a-blog/index.mdx": {
	id: "2019-02-24-my-blog-is-a-digital-garden-not-a-blog/index.mdx";
  slug: "digital-garden";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-03-07-shadow-newsletter-for-evergreen-emails-in-convertkit/index.mdx": {
	id: "2019-03-07-shadow-newsletter-for-evergreen-emails-in-convertkit/index.mdx";
  slug: "shadow-newsletter-for-evergreen-emails-in-convertkit";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-03-18-consult/index.mdx": {
	id: "2019-03-18-consult/index.mdx";
  slug: "consult";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-03-18-how-i-think-about-sending-a-lot-of-email/index.mdx": {
	id: "2019-03-18-how-i-think-about-sending-a-lot-of-email/index.mdx";
  slug: "how-i-think-about-sending-a-lot-of-email";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-04-04--thinking-backwards-is-the-way-to-plan~~PhR0m0AMp/index.mdx": {
	id: "2019-04-04--thinking-backwards-is-the-way-to-plan~~PhR0m0AMp/index.mdx";
  slug: "thinking-backwards-is-the-way-to-plan";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-08-23--review-of-thinking-in-systems-a-primer~~jJkMv6KvV/index.mdx": {
	id: "2019-08-23--review-of-thinking-in-systems-a-primer~~jJkMv6KvV/index.mdx";
  slug: "review-of-thinking-in-systems-a-primer";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-08-23--the-egghead-podcast~~MCc7vK0UL/index.mdx": {
	id: "2019-08-23--the-egghead-podcast~~MCc7vK0UL/index.mdx";
  slug: "the-egghead-podcast";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-08-24--starting-your-own-social-network-with-your-mailing-list~~6ZmR-yUPM/index.mdx": {
	id: "2019-08-24--starting-your-own-social-network-with-your-mailing-list~~6ZmR-yUPM/index.mdx";
  slug: "starting-your-own-social-network-with-your-mailing-list";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-09-21--the-checklist-manifesto~~CTt4aBkGo/index.mdx": {
	id: "2019-09-21--the-checklist-manifesto~~CTt4aBkGo/index.mdx";
  slug: "the-checklist-manifesto";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-09-24--what-i-know-about-freelancing-as-a-developer~~6P4ekD18p/index.mdx": {
	id: "2019-09-24--what-i-know-about-freelancing-as-a-developer~~6P4ekD18p/index.mdx";
  slug: "freelancing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-09-26--how-to-use-eggheadio-to-level-up-as-a-web-developer~~RGvesflbK/index.mdx": {
	id: "2019-09-26--how-to-use-eggheadio-to-level-up-as-a-web-developer~~RGvesflbK/index.mdx";
  slug: "using-egghead";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-09-26--really-good-notes~~3kZk6aSUq/index.mdx": {
	id: "2019-09-26--really-good-notes~~3kZk6aSUq/index.mdx";
  slug: "really-good-notes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-09-26--salary-negotiation-for-web-developers~~W1LnAmr8N/index.mdx": {
	id: "2019-09-26--salary-negotiation-for-web-developers~~W1LnAmr8N/index.mdx";
  slug: "salary-negotiation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-10-03--instead-of-due-dates-we-use-next-check-in-dates-for-projects-at-egghead~~diGUCl_Yy/index.mdx": {
	id: "2019-10-03--instead-of-due-dates-we-use-next-check-in-dates-for-projects-at-egghead~~diGUCl_Yy/index.mdx";
  slug: "instead-of-due-dates-we-use-next-check-in-dates-for-projects-at-egghead";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-10-08--remote-work-over-communicate-with-context~~8nnH_hw4p/index.mdx": {
	id: "2019-10-08--remote-work-over-communicate-with-context~~8nnH_hw4p/index.mdx";
  slug: "remote-work";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-10-08--teaching-workshops~~TBg9xMdat/index.mdx": {
	id: "2019-10-08--teaching-workshops~~TBg9xMdat/index.mdx";
  slug: "teaching-workshops";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-10-09--making-other-people-money~~Uc-AIlYH6/index.mdx": {
	id: "2019-10-09--making-other-people-money~~Uc-AIlYH6/index.mdx";
  slug: "make-money";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-10-22--creating-a-nodejs-serverless-function-as-a-proxy-endpoint-using-express-on-zeit-now~~-PqgLmfz7/index.mdx": {
	id: "2019-10-22--creating-a-nodejs-serverless-function-as-a-proxy-endpoint-using-express-on-zeit-now~~-PqgLmfz7/index.mdx";
  slug: "simple-serverless-now";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-11-14--should-i-use-a-framework~~RikSSYmW0/index.mdx": {
	id: "2019-11-14--should-i-use-a-framework~~RikSSYmW0/index.mdx";
  slug: "should-i-use-a-framework";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-11-17--how-to-choose-a-framework~~sOsDeLZ7Z/index.mdx": {
	id: "2019-11-17--how-to-choose-a-framework~~sOsDeLZ7Z/index.mdx";
  slug: "how-to-choose-a-framework";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-11-17--using-aws-cloudfront-to-serve-a-gatsby-app-on-netlify-as-an-authenticated-sub-route-of-a-rails-app-on-heroku~~b_5x964Og/index.mdx": {
	id: "2019-11-17--using-aws-cloudfront-to-serve-a-gatsby-app-on-netlify-as-an-authenticated-sub-route-of-a-rails-app-on-heroku~~b_5x964Og/index.mdx";
  slug: "gatsby-on-rails";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-11-20--mastering-converkit-by-brennan-dunn~~JsG9WrD6g/index.mdx": {
	id: "2019-11-20--mastering-converkit-by-brennan-dunn~~JsG9WrD6g/index.mdx";
  slug: "mastering-converkit";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-11-30--team-collaboration-and-productivity-in-2020~~gwqbrZJ--/index.mdx": {
	id: "2019-11-30--team-collaboration-and-productivity-in-2020~~gwqbrZJ--/index.mdx";
  slug: "productivity-in-2020";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-12-05--m-in-6-years~~KYrrRhIFx/index.mdx": {
	id: "2019-12-05--m-in-6-years~~KYrrRhIFx/index.mdx";
  slug: "16-in-6";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-12-06--writing-with-rhythm~~8Dpb4uArN/index.mdx": {
	id: "2019-12-06--writing-with-rhythm~~8Dpb4uArN/index.mdx";
  slug: "writing-with-rhythm";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-12-08--on-writing-more~~qG38AKqxq/index.mdx": {
	id: "2019-12-08--on-writing-more~~qG38AKqxq/index.mdx";
  slug: "on-writing-more";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2019-12-09--ad-tracking~~sFE5DnT6K/index.mdx": {
	id: "2019-12-09--ad-tracking~~sFE5DnT6K/index.mdx";
  slug: "ad-tracking";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-01-04--a-decade-of-code~~r7zurcmbF/index.mdx": {
	id: "2020-01-04--a-decade-of-code~~r7zurcmbF/index.mdx";
  slug: "a-decade-of-code";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-01-24--your-evergreen-newsletter-sequence-is-a-bonsai-tree~~CHyfZdPrR/index.mdx": {
	id: "2020-01-24--your-evergreen-newsletter-sequence-is-a-bonsai-tree~~CHyfZdPrR/index.mdx";
  slug: "evergreen-newsletter-bonsai";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-01-28--improve-the-lighting-for-your-webcam-videos~~t-hkJoZHU/index.mdx": {
	id: "2020-01-28--improve-the-lighting-for-your-webcam-videos~~t-hkJoZHU/index.mdx";
  slug: "improve-the-lighting-for-your-webcam-videos";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-02-19--creating-a-self-paced-email-course-with-convertkit-typeform-and-zapier~~706z4kFNP/index.mdx": {
	id: "2020-02-19--creating-a-self-paced-email-course-with-convertkit-typeform-and-zapier~~706z4kFNP/index.mdx";
  slug: "self-paced-email-course";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-03-02--creator-vision-2019~~m93E0XPMx/index.mdx": {
	id: "2020-03-02--creator-vision-2019~~m93E0XPMx/index.mdx";
  slug: "creator-vision-2019";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-03-06--blog-for-somebody-specific~~YTIXc3Vqi/index.mdx": {
	id: "2020-03-06--blog-for-somebody-specific~~YTIXc3Vqi/index.mdx";
  slug: "somebody-specific";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-03-09--work-from-home~~kQzda7h_W/index.mdx": {
	id: "2020-03-09--work-from-home~~kQzda7h_W/index.mdx";
  slug: "work-from-home";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-03-19--archiving-zoom-videos-with-dropbox-and-notion~~4Ncp8vsYm/index.mdx": {
	id: "2020-03-19--archiving-zoom-videos-with-dropbox-and-notion~~4Ncp8vsYm/index.mdx";
  slug: "archiving-zoom-videos-with-dropbox-and-notion";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-04-23--the-best-most-high-quality-microphone-stand-for-your-desk~~efckguWkm/index.mdx": {
	id: "2020-04-23--the-best-most-high-quality-microphone-stand-for-your-desk~~efckguWkm/index.mdx";
  slug: "best-mic-boom";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-04-24--essential-gear-the-elevation-labs-headphone-hook~~w3UuZtges/index.mdx": {
	id: "2020-04-24--essential-gear-the-elevation-labs-headphone-hook~~w3UuZtges/index.mdx";
  slug: "headphone-hook";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-04-26--mastering-css-as-an-advanced-beginner~~90eu3kFZc/index.mdx": {
	id: "2020-04-26--mastering-css-as-an-advanced-beginner~~90eu3kFZc/index.mdx";
  slug: "mastering-css-as-an-advanced-beginner";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-04-26--react-is-a-potato-plant~~UU71pOKip/index.mdx": {
	id: "2020-04-26--react-is-a-potato-plant~~UU71pOKip/index.mdx";
  slug: "react-potato-plant";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-04-29--egghead-vs-udemy-for-professional-web-developers~~s1pNaMFi6/index.mdx": {
	id: "2020-04-29--egghead-vs-udemy-for-professional-web-developers~~s1pNaMFi6/index.mdx";
  slug: "egghead-vs-udemy";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-05-04--start-shipping-more-accessible-react-applications-today~~hRf9bhag8/index.mdx": {
	id: "2020-05-04--start-shipping-more-accessible-react-applications-today~~hRf9bhag8/index.mdx";
  slug: "accessible-react-applications";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-05-12--5-layers-react-state~~uM_l7fLmT/index.mdx": {
	id: "2020-05-12--5-layers-react-state~~uM_l7fLmT/index.mdx";
  slug: "5-layers-react-state";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-05-12--using-react-context-and-custom-react-hooks-for-state-management-in-react-apps~~6zA6vP7oT/index.mdx": {
	id: "2020-05-12--using-react-context-and-custom-react-hooks-for-state-management-in-react-apps~~6zA6vP7oT/index.mdx";
  slug: "react-context";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-07-11--building-a-second-brain~~BpvUfRbEs/index.mdx": {
	id: "2020-07-11--building-a-second-brain~~BpvUfRbEs/index.mdx";
  slug: "basb";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-07-11--progressive-summarization-for-non-fiction-books~~tOuc7OI1p/index.mdx": {
	id: "2020-07-11--progressive-summarization-for-non-fiction-books~~tOuc7OI1p/index.mdx";
  slug: "progressive-summarization";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-07-11--use-calibre-to-convert-kindle-books-youve-purchased-to-pdf~~Fvwvjdy7m/index.mdx": {
	id: "2020-07-11--use-calibre-to-convert-kindle-books-youve-purchased-to-pdf~~Fvwvjdy7m/index.mdx";
  slug: "calibre-kindle-to-pdf";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-07-11--using-pdf-expert-to-highlight-and-summarize-non-fiction-books~~F5HJeOXUQ/index.mdx": {
	id: "2020-07-11--using-pdf-expert-to-highlight-and-summarize-non-fiction-books~~F5HJeOXUQ/index.mdx";
  slug: "pdf-expert";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-07-25--basic-painstorming-for-the-new-adventurer~~SVHjZCaPM/index.mdx": {
	id: "2020-07-25--basic-painstorming-for-the-new-adventurer~~SVHjZCaPM/index.mdx";
  slug: "basic-painstorming";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-08-07--how-to-be-a-tummler-designing-for-conversation~~DWpz57aa8/index.mdx": {
	id: "2020-08-07--how-to-be-a-tummler-designing-for-conversation~~DWpz57aa8/index.mdx";
  slug: "tummler";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-08-07--knowledge-adventure-club~~Xxk0SbMKc/index.mdx": {
	id: "2020-08-07--knowledge-adventure-club~~Xxk0SbMKc/index.mdx";
  slug: "knowledge-adventure-club";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-09-03--understanding-by-design~~l0iy2bzHc/index.mdx": {
	id: "2020-09-03--understanding-by-design~~l0iy2bzHc/index.mdx";
  slug: "understanding-by-design";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-09-03--usestate-react-hook-allows-updating-state-with-a-function~~70dpp6MqW/index.mdx": {
	id: "2020-09-03--usestate-react-hook-allows-updating-state-with-a-function~~70dpp6MqW/index.mdx";
  slug: "usestate-react-hook-allows-updating-state-with-a-function";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-09-10--continuous-integration-with-jest-test-and-github-actions~~tBl-puhiR/index.mdx": {
	id: "2020-09-10--continuous-integration-with-jest-test-and-github-actions~~tBl-puhiR/index.mdx";
  slug: "jest-and-github-actions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-09-11--should-i-use-automated-dependency-management~~fIaEsci5q/index.mdx": {
	id: "2020-09-11--should-i-use-automated-dependency-management~~fIaEsci5q/index.mdx";
  slug: "automated-dependency-management";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-09-20--7-steps-of-the-30x500-system-of-product-success~~CM1u7_ze3/index.mdx": {
	id: "2020-09-20--7-steps-of-the-30x500-system-of-product-success~~CM1u7_ze3/index.mdx";
  slug: "7-steps-of-30x500";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-10-18--self-paced-email-course-and-evergreen-product-pitch-using-convertkit-automations~~6gp53m_10/index.mdx": {
	id: "2020-10-18--self-paced-email-course-and-evergreen-product-pitch-using-convertkit-automations~~6gp53m_10/index.mdx";
  slug: "self-paced-email-course-convertkit";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-11-13--bulletproof-markdown-to-convertkit-workflow-for-emails~~eVkyhcRI2/index.mdx": {
	id: "2020-11-13--bulletproof-markdown-to-convertkit-workflow-for-emails~~eVkyhcRI2/index.mdx";
  slug: "use-markdown-emails-in-convertkit";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-12-02--discovery-and-roadmapping-engagements-for-hiring-consultants~~nUf6oxU8L/index.md": {
	id: "2020-12-02--discovery-and-roadmapping-engagements-for-hiring-consultants~~nUf6oxU8L/index.md";
  slug: "discovery-engagements";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"2020-12-02--the-barber-shop-paradox~~DLQgxDrKe/index.mdx": {
	id: "2020-12-02--the-barber-shop-paradox~~DLQgxDrKe/index.mdx";
  slug: "barber-shop-paradox";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-12-06--a-childs-totally-innapropriate-introduction-to-hip-hop~~mhg0LUpHY/index.mdx": {
	id: "2020-12-06--a-childs-totally-innapropriate-introduction-to-hip-hop~~mhg0LUpHY/index.mdx";
  slug: "hip-hop";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-12-07--how-we-iterate-and-collaborate-with-creators-at-egghead~~GtAIdxNit/index.mdx": {
	id: "2020-12-07--how-we-iterate-and-collaborate-with-creators-at-egghead~~GtAIdxNit/index.mdx";
  slug: "collaborate";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-12-07--just-fucking-do-it~~Com49rZhH/index.mdx": {
	id: "2020-12-07--just-fucking-do-it~~Com49rZhH/index.mdx";
  slug: "jfdi";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2020-12-08--crafting-a-business-oriented-developer-portfolio-that-stands-out~~Ie_EEt0Ce/index.mdx": {
	id: "2020-12-08--crafting-a-business-oriented-developer-portfolio-that-stands-out~~Ie_EEt0Ce/index.mdx";
  slug: "developer-portfolio";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2021-01-08--what-to-teach-web-developers-in-2021~~VetReOxM9/index.mdx": {
	id: "2021-01-08--what-to-teach-web-developers-in-2021~~VetReOxM9/index.mdx";
  slug: "what-to-teach-web-developers-in-2021";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2021-02-17--serverless-marketing-automation-with-convertkit-and-nextjs~~UpFuf0CFx/index.mdx": {
	id: "2021-02-17--serverless-marketing-automation-with-convertkit-and-nextjs~~UpFuf0CFx/index.mdx";
  slug: "serverless-marketing-automation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2021-03-09--using-a-random-number-to-segment-emails-in-convertkit-aitomations-using-liquid~~KktIJ0DWd/index.mdx": {
	id: "2021-03-09--using-a-random-number-to-segment-emails-in-convertkit-aitomations-using-liquid~~KktIJ0DWd/index.mdx";
  slug: "random-number-convertkit-liquid";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2021-03-26--usevideojs-a-react-hooks-for-videojs~~0-JvBF7id/index.mdx": {
	id: "2021-03-26--usevideojs-a-react-hooks-for-videojs~~0-JvBF7id/index.mdx";
  slug: "usevideojs-a-react-hooks-for-videojs";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2021-04-16--self-paced-email-course-in-customerio~~F-l-isFmj/index.mdx": {
	id: "2021-04-16--self-paced-email-course-in-customerio~~F-l-isFmj/index.mdx";
  slug: "self-paced-email-course-customerio";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2021-08-01--collaboration-on-a-product-with-a-partner~~-w_AiU0sp/index.mdx": {
	id: "2021-08-01--collaboration-on-a-product-with-a-partner~~-w_AiU0sp/index.mdx";
  slug: "product-collaboration";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2021-08-01--strategy-of-preeminence~~Io0R8ZzGx/index.mdx": {
	id: "2021-08-01--strategy-of-preeminence~~Io0R8ZzGx/index.mdx";
  slug: "strategy-of-preeminence";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2021-09-10--react-video-player-component-using-hooks-typescript-and-xstate~~EB5TFcS9n/index.mdx": {
	id: "2021-09-10--react-video-player-component-using-hooks-typescript-and-xstate~~EB5TFcS9n/index.mdx";
  slug: "react-video-player";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2022-11-18--15-years-of-twitter-vs-that-one-rich-asshole~~ltVbMwia-/index.mdx": {
	id: "2022-11-18--15-years-of-twitter-vs-that-one-rich-asshole~~ltVbMwia-/index.mdx";
  slug: "15-years-of-twitter-vs-that-one-rich-asshole";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2022-11-18--using-mastodon-as-a-replacement-for-twitter~~3y9OAsZx7/index.mdx": {
	id: "2022-11-18--using-mastodon-as-a-replacement-for-twitter~~3y9OAsZx7/index.mdx";
  slug: "mastodon-as-a-replacement-for-twitter";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2022-11-20--migrating-the-blog-from-gatsby-to-astro-was-ez~~QhS3p2I1d/index.mdx": {
	id: "2022-11-20--migrating-the-blog-from-gatsby-to-astro-was-ez~~QhS3p2I1d/index.mdx";
  slug: "migrating-to-astro-was-ez";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2023-05-26--working-on-badass-courses-in-2023~~BMrO_36pv/index.mdx": {
	id: "2023-05-26--working-on-badass-courses-in-2023~~BMrO_36pv/index.mdx";
  slug: "badass-courses-2023";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2023-05-29--self-hosting~~TKGRHR04k/index.mdx": {
	id: "2023-05-29--self-hosting~~TKGRHR04k/index.mdx";
  slug: "self-hosting";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2023-06-13--charmed-kubeflow-on-ubuntu-2204-with-microk8s~~TUxq3eC1_/index.mdx": {
	id: "2023-06-13--charmed-kubeflow-on-ubuntu-2204-with-microk8s~~TUxq3eC1_/index.mdx";
  slug: "charmed-kubeflow-on-ubuntu-2204-with-microk8s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2023-07-01--ranch-camp-generative-art-pilgrimage~~O47HFUO60/index.mdx": {
	id: "2023-07-01--ranch-camp-generative-art-pilgrimage~~O47HFUO60/index.mdx";
  slug: "ranch-camp-generative-art-pilgrimage";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2024-06-29--bluesky~~jJge-8CB1/index.mdx": {
	id: "2024-06-29--bluesky~~jJge-8CB1/index.mdx";
  slug: "bluesky";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2025-01-03--high-protein~~YTxh1eRNZ/index.mdx": {
	id: "2025-01-03--high-protein~~YTxh1eRNZ/index.mdx";
  slug: "eat";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2025-02-20--dirtywave-tracker-tips-from-red-means-recording~~UMeTAMhqY/index.mdx": {
	id: "2025-02-20--dirtywave-tracker-tips-from-red-means-recording~~UMeTAMhqY/index.mdx";
  slug: "dirtywave-tracker-tips-from-red-means-recording";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2025-12-08--opencode-setup~~_oRuGmJIt/index.mdx": {
	id: "2025-12-08--opencode-setup~~_oRuGmJIt/index.mdx";
  slug: "opencode-setup";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2025-12-09--diy-homemade-lmnt-clone-lemonade-flavor~~x9fsTe7-4/index.mdx": {
	id: "2025-12-09--diy-homemade-lmnt-clone-lemonade-flavor~~x9fsTe7-4/index.mdx";
  slug: "diy-homemade-lmnt-clone-lemonade-flavor";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"2026-01-23--from-290-to-jacked-my-mybodytutor-story~~zxGsaGKG5/index.mdx": {
	id: "2026-01-23--from-290-to-jacked-my-mybodytutor-story~~zxGsaGKG5/index.mdx";
  slug: "get-jacked-50";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"export-drip-tags-for-convertkit-import/index.md": {
	id: "export-drip-tags-for-convertkit-import/index.md";
  slug: "export-drip-tags-for-convertkit";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"frontmatter-placeholder/index.md": {
	id: "frontmatter-placeholder/index.md";
  slug: "invisible-post";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"now/index.mdx": {
	id: "now/index.mdx";
  slug: "now";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"using-my-dSLR-as-a-webcam-for-live-streaming/index.mdx": {
	id: "using-my-dSLR-as-a-webcam-for-live-streaming/index.mdx";
  slug: "dSLR-webcam-for-live-streaming";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"zsh-setup/index.mdx": {
	id: "zsh-setup/index.mdx";
  slug: "zsh-setup";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
};
"legacy_blog": {
"2012-07-25-fresh-start-migrating-wordpress-octopress.mdx": {
	id: "2012-07-25-fresh-start-migrating-wordpress-octopress.mdx";
  slug: "2012-07-25-fresh-start-migrating-wordpress-octopress";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2012-08-01-code-review-how-to-make-friends-and-influence-developers.mdx": {
	id: "2012-08-01-code-review-how-to-make-friends-and-influence-developers.mdx";
  slug: "2012-08-01-code-review-how-to-make-friends-and-influence-developers";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2012-08-27-on-transitioning-to-javascript-from-as3-slash-flex.mdx": {
	id: "2012-08-27-on-transitioning-to-javascript-from-as3-slash-flex.mdx";
  slug: "2012-08-27-on-transitioning-to-javascript-from-as3-slash-flex";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2012-08-28-practical-object-oriented-design-in-ruby-is-a-really-good-book.mdx": {
	id: "2012-08-28-practical-object-oriented-design-in-ruby-is-a-really-good-book.mdx";
  slug: "2012-08-28-practical-object-oriented-design-in-ruby-is-a-really-good-book";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2012-11-17-using-custom-jasmine-matchers-to-make-unit-tests-more-readable.mdx": {
	id: "2012-11-17-using-custom-jasmine-matchers-to-make-unit-tests-more-readable.mdx";
  slug: "2012-11-17-using-custom-jasmine-matchers-to-make-unit-tests-more-readable";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-04-09-getting-to-know-vim.mdx": {
	id: "2013-04-09-getting-to-know-vim.mdx";
  slug: "2013-04-09-getting-to-know-vim";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-04-09-vim-adventures-a-fun-way-to-pick-up-some-basic-skills.mdx": {
	id: "2013-04-09-vim-adventures-a-fun-way-to-pick-up-some-basic-skills.mdx";
  slug: "2013-04-09-vim-adventures-a-fun-way-to-pick-up-some-basic-skills";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-04-18-a-tiny-review-one-week-with-an-11-macbook-air-for-software-development.mdx": {
	id: "2013-04-18-a-tiny-review-one-week-with-an-11-macbook-air-for-software-development.mdx";
  slug: "2013-04-18-a-tiny-review-one-week-with-an-11-macbook-air-for-software-development";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-04-23-5-essential-vim-plugins.mdx": {
	id: "2013-04-23-5-essential-vim-plugins.mdx";
  slug: "2013-04-23-5-essential-vim-plugins";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-04-24-modeling-data-and-state-in-your-angularjs-application.mdx": {
	id: "2013-04-24-modeling-data-and-state-in-your-angularjs-application.mdx";
  slug: "2013-04-24-modeling-data-and-state-in-your-angularjs-application";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-04-26-a-rose-by-any-other-name.mdx": {
	id: "2013-04-26-a-rose-by-any-other-name.mdx";
  slug: "2013-04-26-a-rose-by-any-other-name";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-05-01-when-is-a-singleton-not-a-singleton.mdx": {
	id: "2013-05-01-when-is-a-singleton-not-a-singleton.mdx";
  slug: "2013-05-01-when-is-a-singleton-not-a-singleton";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-05-21-size-and-composition-of-effective-teams.mdx": {
	id: "2013-05-21-size-and-composition-of-effective-teams.mdx";
  slug: "2013-05-21-size-and-composition-of-effective-teams";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-05-22-lessons-learned-kicking-off-an-angularjs-project.mdx": {
	id: "2013-05-22-lessons-learned-kicking-off-an-angularjs-project.mdx";
  slug: "2013-05-22-lessons-learned-kicking-off-an-angularjs-project";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-06-06-my-sketchnotes-and-thoughts-from-baconbizconf-2013.mdx": {
	id: "2013-06-06-my-sketchnotes-and-thoughts-from-baconbizconf-2013.mdx";
  slug: "2013-06-06-my-sketchnotes-and-thoughts-from-baconbizconf-2013";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-06-07-what-i-learned-from-brennan-dunns-consultancy-masterclass-w-slash-sketchnotes.mdx": {
	id: "2013-06-07-what-i-learned-from-brennan-dunns-consultancy-masterclass-w-slash-sketchnotes.mdx";
  slug: "2013-06-07-what-i-learned-from-brennan-dunns-consultancy-masterclass-w-slash-sketchnotes";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-06-10-the-paralyzing-grip-of-fear.mdx": {
	id: "2013-06-10-the-paralyzing-grip-of-fear.mdx";
  slug: "2013-06-10-the-paralyzing-grip-of-fear";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-06-17-coming-to-terms-with-enterprise-javascript.mdx": {
	id: "2013-06-17-coming-to-terms-with-enterprise-javascript.mdx";
  slug: "2013-06-17-coming-to-terms-with-enterprise-javascript";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-06-22-optimizing-a-photography-studio-website-for-converstion-and-seo-the-analysis.mdx": {
	id: "2013-06-22-optimizing-a-photography-studio-website-for-converstion-and-seo-the-analysis.mdx";
  slug: "2013-06-22-optimizing-a-photography-studio-website-for-converstion-and-seo-the-analysis";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-06-25-why-doesnt-my-photography-studio-website-appear-in-search-results.mdx": {
	id: "2013-06-25-why-doesnt-my-photography-studio-website-appear-in-search-results.mdx";
  slug: "2013-06-25-why-doesnt-my-photography-studio-website-appear-in-search-results";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-07-15-a-look-at-angularjs-internal-directives-that-override-standard-html-tags.mdx": {
	id: "2013-07-15-a-look-at-angularjs-internal-directives-that-override-standard-html-tags.mdx";
  slug: "2013-07-15-a-look-at-angularjs-internal-directives-that-override-standard-html-tags";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-07-22-the-basics-of-using-ui-router-with-angularjs.mdx": {
	id: "2013-07-22-the-basics-of-using-ui-router-with-angularjs.mdx";
  slug: "2013-07-22-the-basics-of-using-ui-router-with-angularjs";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-07-29-using-angularjs-stop-using-jquery-as-a-crutch.mdx": {
	id: "2013-07-29-using-angularjs-stop-using-jquery-as-a-crutch.mdx";
  slug: "2013-07-29-using-angularjs-stop-using-jquery-as-a-crutch";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-08-03-learn-angularjs-in-a-weekend.mdx": {
	id: "2013-08-03-learn-angularjs-in-a-weekend.mdx";
  slug: "2013-08-03-learn-angularjs-in-a-weekend";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-08-18-configuring-dependency-injection-in-angularjs.mdx": {
	id: "2013-08-18-configuring-dependency-injection-in-angularjs.mdx";
  slug: "2013-08-18-configuring-dependency-injection-in-angularjs";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-09-15-why-i-built-an-angularjs-training-site-on-rails.mdx": {
	id: "2013-09-15-why-i-built-an-angularjs-training-site-on-rails.mdx";
  slug: "2013-09-15-why-i-built-an-angularjs-training-site-on-rails";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-09-23-how-to-record-a-high-quality-screencast.mdx": {
	id: "2013-09-23-how-to-record-a-high-quality-screencast.mdx";
  slug: "2013-09-23-how-to-record-a-high-quality-screencast";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2013-10-30-how-to-build-a-subscription-service-on-rails-a-noobs-guide.mdx": {
	id: "2013-10-30-how-to-build-a-subscription-service-on-rails-a-noobs-guide.mdx";
  slug: "2013-10-30-how-to-build-a-subscription-service-on-rails-a-noobs-guide";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2014-02-06-stop-writing-for-loops-start-using-underscorejs.mdx": {
	id: "2014-02-06-stop-writing-for-loops-start-using-underscorejs.mdx";
  slug: "2014-02-06-stop-writing-for-loops-start-using-underscorejs";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2014-02-11-lets-make-full-ass-angularjs-directives.mdx": {
	id: "2014-02-11-lets-make-full-ass-angularjs-directives.mdx";
  slug: "2014-02-11-lets-make-full-ass-angularjs-directives";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2014-12-24-bootstrapping-egghead-dot-io-to-feed-my-family-2014-in-review.mdx": {
	id: "2014-12-24-bootstrapping-egghead-dot-io-to-feed-my-family-2014-in-review.mdx";
  slug: "2014-12-24-bootstrapping-egghead-dot-io-to-feed-my-family-2014-in-review";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2015-12-31-2015-year-in-review.mdx": {
	id: "2015-12-31-2015-year-in-review.mdx";
  slug: "2015-12-31-2015-year-in-review";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2016-04-08-setting-goals-for-my-version-of-success.mdx": {
	id: "2016-04-08-setting-goals-for-my-version-of-success.mdx";
  slug: "2016-04-08-setting-goals-for-my-version-of-success";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2017-01-02-2016-was-amazing-best-year-yet.mdx": {
	id: "2017-01-02-2016-was-amazing-best-year-yet.mdx";
  slug: "2017-01-02-2016-was-amazing-best-year-yet";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2017-10-26-why-we-hire-consultants-to-help-build-egghead-dot-io.mdx": {
	id: "2017-10-26-why-we-hire-consultants-to-help-build-egghead-dot-io.mdx";
  slug: "2017-10-26-why-we-hire-consultants-to-help-build-egghead-dot-io";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2018-01-01-what-i-learned-and-did-in-2017.mdx": {
	id: "2018-01-01-what-i-learned-and-did-in-2017.mdx";
  slug: "2018-01-01-what-i-learned-and-did-in-2017";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2018-02-12-how-we-work-at-egghead-dot-io.mdx": {
	id: "2018-02-12-how-we-work-at-egghead-dot-io.mdx";
  slug: "2018-02-12-how-we-work-at-egghead-dot-io";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
"2018-10-02-ive-got-a-confession-to-make.mdx": {
	id: "2018-10-02-ive-got-a-confession-to-make.mdx";
  slug: "2018-10-02-ive-got-a-confession-to-make";
  body: string;
  collection: "legacy_blog";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
