SELECT * FROM flexpath_final.collections c
left join flexpath_final.users u  on c.username = u.username
left join flexpath_final.book_collections bc on bc.collection_id = c.collection_id
left join flexpath_final.books b on bc.book_id = b.book_id
left join flexpath_final.reviews r on r.book_id = b.book_id
where u.username = 'x'
or c.privacy = false