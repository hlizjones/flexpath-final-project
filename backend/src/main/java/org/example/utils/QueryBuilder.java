package org.example.utils;

import org.springframework.jdbc.core.PreparedStatementCreator;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * A SQL query builder.
 */
public class QueryBuilder {
    private List<String> columns;
    private List<String> tables;
    private List<String> joins;
    private List<String> whereClauses;
    private List<Object> values;
    private List<String> orderByClauses;
    private String query;

    /**
     * Creates a new query builder object.
     */
    public QueryBuilder() {
        this.columns = new ArrayList<String>();
        this.tables = new ArrayList<String>();
        this.joins = new ArrayList<String>();
        this.whereClauses = new ArrayList<String>();
        this.values = new ArrayList<>();
        this.orderByClauses = new ArrayList<>();
    }

    /**
     * Creates list of columns for the SELECT clause.
     *
     * @param columns The column names.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder select(String ...columns) {
        this.columns.addAll(Arrays.asList(columns));
        return this;
    }

    /**
     * Creates list of tables for the FROM clause.
     *
     * @param tables The table names.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder from(String ...tables) {
        this.tables.addAll(Arrays.asList(tables));
        return this;
    }

    /**
     * Creates list of JOIN clauses.
     *
     * @param joins JOIN clauses to append to SQL query.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder join(String ...joins) {
        this.joins.addAll(Arrays.asList(joins));
        return this;
    }

    /**
     * Creates list of WHERE conditions.
     *
     * @param whereClauses WHERE clauses to append to the SQL query.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder where(String ...whereClauses) {
        this.whereClauses.addAll(Arrays.asList(whereClauses));
        return this;
    }

    /**
     * Creates list of query parameters.
     *
     * @param values Query parameters.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder values(String ...values) {
        this.values.addAll(Arrays.asList(values));
        return this;
    }

    /**
     * Creates list of ORDER BY conditions.
     *
     * @param orderByClauses ORDER BY clauses to append to the SQL query.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder orderBy(String ...orderByClauses) {
        this.orderByClauses.addAll(Arrays.asList(orderByClauses));
        return this;
    }

    /**
     * Builds the SQL query and prepares a new PreparedStatementCreator.
     *
     * @return PreparedStatementCreator
     */
    public PreparedStatementCreator build() {
        StringBuilder sb = new StringBuilder();
        sb.append("SELECT ");
        sb.append(String.join(", ", columns));

        sb.append(" FROM ");
        sb.append(String.join(", ", tables));

        if (!joins.isEmpty()) {
            sb.append(" JOIN ");
            sb.append(String.join(" JOIN", joins));
        }

        if (!whereClauses.isEmpty()) {
            sb.append(" WHERE ");
            for (int i = 0; i < whereClauses.size(); i++) {
                sb.append(whereClauses.get(i));
                if (i < whereClauses.size() - 1) {
                    sb.append(" AND ");
                }
            }
        }

        if (!orderByClauses.isEmpty()) {
            sb.append(" ORDER BY ");
            sb.append(String.join(", ", orderByClauses));
        }

        PreparedStatementCreator psc = con -> {
            PreparedStatement ps = con.prepareStatement(sb.toString());
            if (!values.isEmpty()) {
                for (int i = 0; i < values.size(); i++) {
                    if (values.get(i) instanceof Integer) {
                        ps.setInt(i + 1, (int) values.get(i));
                    } else if (values.get(i) instanceof String) {
                        ps.setString(i + 1, (String) values.get(i));
                    } else if (values.get(i) instanceof Boolean) {
                        ps.setBoolean(i + 1, (Boolean) values.get(i));
                    }
                }
            }
            return ps;
        };

        return psc;
    }

//    private String sortBooks(String columnName, String sortDirection) {
//        String column;
//        String direction;
//        switch (columnName) {
//            case "author":
//                column = "author";
//                break;
//            case "rating":
//                column = "rating";
//                break;
//            case "genre":
//                column = "genre";
//                break;
//            default:
//                column = "title";
//        }
//        switch (sortDirection) {
//            case "desc":
//                direction = "desc";
//                break;
//            default:
//                direction = "asc";
//                break;
//        }
//        return (column + " " + direction);
//    }
}
