"use client";

import React, { useEffect, useState } from "react";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-dialogue";
import useFetch from "@/hooks/use-fetch";
import { createCollection } from "@/actions/collection";
import { toast } from "sonner";

const Collections = ({ collections = [], entriesByCollection }) => {
  const [isCollectionDialogueOpen, setIsCollectionDialogueOpen] =
    useState(false);

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogueOpen(false);
      toast.success(`Collection ${createdCollection.name} created`);
    }
  }, [createdCollection]);

  const handleCreateCollection = async (data) => {
    createCollectionFn(data)
  };

  if(collections.length === 0) return <></>

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CollectionPreview
          isCreateNew={true}
          onCreateNew={() => setIsCollectionDialogueOpen(true)}
        />

        {entriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            name="unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized={true}
          />
        )}

        {collections?.map((col) => (
          <CollectionPreview
            key={col.id}
            id={col.id}
            name={col.name}
            entries={entriesByCollection[col.id] || []}
          />
        ))}

        <CollectionForm
          open={isCollectionDialogueOpen}
          setOpen={setIsCollectionDialogueOpen}
          onSuccess={handleCreateCollection}
          loading={createCollectionLoading}
        />
      </div>
    </section>
  );
};

export default Collections;
