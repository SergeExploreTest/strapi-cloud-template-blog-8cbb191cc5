module.exports = async ({ strapi }) => {
  console.log("🚀 Bootstrapping Strapi Collections...");

  // Define new collection types
  const collections = [
    {
      name: "websites",
      attributes: {
        name: { type: "string", required: true, unique: true },
        slug: { type: "string", required: true, unique: true },
        default_language: { type: "relation", target: "api::languages.languages" },
        supported_languages: { type: "relation", target: "api::languages.languages", relation: "manyToMany" },
        supported_segments: { type: "relation", target: "api::segments.segments", relation: "manyToMany" },
        shared_content_categories: { type: "relation", target: "api::categories.categories", relation: "manyToMany" },
      },
    },
    {
      name: "segments",
      attributes: {
        name: { type: "string", required: true },
        slug: { type: "string", required: true, unique: true },
      },
    },
    {
      name: "languages",
      attributes: {
        name: { type: "string", required: true },
        slug: { type: "string", required: true, unique: true },
      },
    },
    {
      name: "articles",
      attributes: {
        title: { type: "string", required: true },
        content: { type: "richtext" },
        websites: { type: "relation", target: "api::websites.websites", relation: "manyToMany" },
        segments: { type: "relation", target: "api::segments.segments", relation: "manyToMany" },
        language: { type: "relation", target: "api::languages.languages", relation: "manyToOne" },
      },
    },
  ];

  for (const collection of collections) {
    try {
      await strapi.db.query(`api::${collection.name}.${collection.name}`).create(collection);
      console.log(`✅ Created collection: ${collection.name}`);
    } catch (error) {
      console.warn(`⚠️ Collection already exists: ${collection.name}`);
    }
  }

  console.log("🎉 Strapi Bootstrap Completed!");
};
